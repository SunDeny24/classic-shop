//데이터 핸들링 커스텀 훅
//app/hooks/useProducts.js
'use client';

import { useState, useEffect } from 'react';
import { fetchFashionProducts } from '@/lib/services/fashionService';
import formatPrice from '@/utils/formatPrice';

/**
 * 네이버 쇼핑 API 응답 데이터 가공
 * @param {object} apiResponse - 네이버 쇼핑 API 응답객체
 * @returns {Array} 큐레이션된 상품 목록 배열
 */
const processNaverData = (apiResponse) => {
    //맞는 배열검증
    if (!apiResponse || !Array.isArray(apiResponse.items)) {
        return [];
    }
    const curatedProductMap = new Map();
    apiResponse.items.forEach((item) => {
        const key = item.productId; //키는 네이버의 productId
        const currentPrice = parseInt(item.lprice, 10); //최저가 10진수 변환

        //상품ID없거나, 가격유효하지않은 경우, 상품이름, 상품이미지가 없는 경우 검증
        if (!key || isNaN(currentPrice) || !item.title || !item.image) {
            return;
        }
        //title <b>태그제거
        const cleanTitle = item.title.replace(/<b>/g, '').replace(/<\/b>/g, '');

        //대표상품으로 묶기
        if (!curatedProductMap.has(key)) {
            curatedProductMap.set(key, {
                productId: key,
                title: cleanTitle,
                image: item.image,
                brand: item.brand || item.mallName || '알수없음',
                link: item.link,
                lprice: formatPrice(currentPrice),
            });
        } else {
            //기존상품의 최저가 셋팅
            const existProduct = curatedProductMap.get(key);
            //현재최저가<기존최저가 일시 더 낮은 가격으로 변경
            if (currentPrice < existProduct.lprice) {
                existProduct.lprice = formatPrice(currentPrice); //더 낮은 가격의 현재최저가로 변경
                existProduct.link = item.link;
                existProduct.mallName = item.mallName;
            }
        }
    });
    return Array.from(curatedProductMap.values());
};

export function useProducts(query, options = {}) {
    //상태관리 정의
    const [products, setProducts] = useState([]); //상품데이터 배열 state
    const [loading, setLoading] = useState(false); //로딩여부 state
    const [error, setError] = useState(null); //에러 state

    //데이터 가져와서 api fetch함수 호출시킴
    const load = async () => {
        if (!query) return; //쿼리없으면 return
        setLoading(true);
        setError(null);

        try {
            const data = await fetchFashionProducts(query, options);
            const rawItems = data.items ?? [];
            const curatedData = processNaverData({ items: rawItems });
            setProducts(curatedData);
        } catch (e) {
            setError(e.message ?? '알수없는 에러 등장');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [query]);

    return { products, loading, error, refetch: load };
}
