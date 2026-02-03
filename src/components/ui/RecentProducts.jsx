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

    const isEmpty = recentProducts.length === 0;

    // 카테고리섹션으로 이동하는 함수
    const scrollToCategory = () => {
        const headerElement = document.querySelector('header');
        const categoryElement = document.getElementById('category-section');
        if (!categoryElement) return;

        //헤더 높이
        const headerHeight = headerElement?.offsetHeight ?? 0;

        const paddingTop = 100; // py-12 + 나머지 중복 추후 수정 예정
        const y = categoryElement.offsetTop - headerHeight + paddingTop * -1;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <div>
            {isEmpty ? (
                <div className="py-20 text-center">
                    <p className="text-zinc-400 mb-4">아직 본 상품이 없습니다</p>
                    <p className="text-sm text-zinc-500">카테고리에서 상품을 둘러보세요</p>
                    <button onClick={scrollToCategory} className="text-sm text-blue-500 underline">
                        카테고리 둘러보기
                    </button>
                </div>
            ) : (
                <ProductCardGrid gridClass={gridClass} productInfo={recentProducts} isLoading={false} />
            )}
        </div>
    );
}
