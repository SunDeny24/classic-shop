// src/components/ui/RecentProducts
// 최근 본 상품 컴포넌트
'use client';

import { useState, useEffect } from 'react';
import ProductCardGrid from './ProductCardGrid';

export default function RecentProducts() {
    const [recentProducts, setRecentProducts] = useState([]); //최근 본상품 상태관리
    const gridClass = 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10'; //상품그리드 css 설정

    useEffect(() => {
        const items = localStorage.getItem('recent_products');
        const parseItems = items ? JSON.parse(items) : [];
        setRecentProducts(parseItems);
    }, []);

    return (
        <div className="p-8">
            <ProductCardGrid gridClass={gridClass} productInfo={recentProducts} isLoading={false} />
        </div>
    );
}
