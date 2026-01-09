//네이버 상품목록 조회 커스텀 훅
//src/hooks/useProducts.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchFashionProducts } from '@/lib/services/fashionService';
import formatPrice from '@/utils/formatPrice';

const DISPLAY = 100;

/**
 * 네이버 쇼핑 API 응답 데이터 가공
 * @param {object} apiResponse - 네이버 쇼핑 API 응답객체
 * @returns {Array} 큐레이션된 상품 목록 배열
 */
const processNaverData = (apiResponse, keyword) => {
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
                rawPrice: currentPrice,
                productType: item.productType,
                mallName: item.mallName,
                keyword: keyword,
            });
        } else {
            //기존상품의 최저가 셋팅
            const existProduct = curatedProductMap.get(key);
            //현재최저가<기존최저가 일시 더 낮은 가격으로 변경
            if (currentPrice < existProduct.lprice) {
                existProduct.lprice = formatPrice(currentPrice); //더 낮은 가격의 현재최저가로 변경
                existProduct.rawPrice = currentPrice;
                existProduct.link = item.link;
                existProduct.mallName = item.mallName;
            }
        }
    });
    return Array.from(curatedProductMap.values());
};

export function useProducts(query, options = {}) {
    //상태관리 정의
    const [rawProducts, setrawProducts] = useState([]); //상품데이터 배열 state
    const [loading, setLoading] = useState(true); //로딩여부 state
    const [error, setError] = useState(null); //에러 state
    const [page, setPage] = useState(1); //현재 페이지 state
    const [sortType, setSortType] = useState('default'); //정렬 state

    //데이터 가져와서 api fetch함수 호출시킴
    const load = async (nextPage = 1) => {
        if (!query) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            //처음 100개 요청
            const start = (nextPage - 1) * DISPLAY + 1;
            const data = await fetchFashionProducts(query, { ...options, start, display: DISPLAY, sort: 'sim' });
            const curatedData = processNaverData({ items: data.items ?? [] }, query);
            if (nextPage === 1) {
                //첫페이지에서는 그대로 데이터 가져옴
                setrawProducts(curatedData);
            } else {
                //다음 페이지부터는 기존값에 추가
                //+ 데이터 합칠때 productId 중복체크로직 추가
                setrawProducts((prev) => {
                    const existingIds = new Set(prev.map((item) => item.productId));
                    const uniqueNewData = curatedData.filter((item) => !existingIds.has(item.productId));
                    return [...prev, ...uniqueNewData];
                });
            }

            setPage(nextPage); //페이지 셋팅
        } catch (e) {
            setError(e.message ?? '알수없는 에러 등장');
        } finally {
            setLoading(false);
        }
    };

    //정렬 로직(가격순)
    const products = useMemo(() => {
        const sorted = [...rawProducts];

        if (sortType === 'low') {
            sorted.sort((a, b) => a.rawPrice - b.rawPrice);
        }
        if (sortType === 'high') {
            sorted.sort((a, b) => b.rawPrice - a.rawPrice);
        }
        return sorted;
    }, [rawProducts, sortType]);

    //검색어 바뀌면 1페이지부터 load처리
    useEffect(() => {
        if (!query) {
            return; //query없이 호출 x
        }
        load(1);
    }, [query]);

    //다음 페이지 요청
    const loadMore = () => load(page + 1);

    return {
        products,
        loading,
        error,
        sortType,
        setSortType,
        refetch: () => load(page),
        loadMore,
    };
}
