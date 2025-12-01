//데이터 핸들링 커스텀 훅
//app/hooks/useProducts.js
'use client';

import { useState, useEffect } from 'react';
import { fetchFashionProducts } from '../lib/services/fashionService';

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
            setProducts(data.items ?? []);
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
