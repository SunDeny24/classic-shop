// src/components/ui/RecentProducts
// 최근 본 상품 컴포넌트
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductCardGrid from './ProductCardGrid';

export default function RecentProducts({ emptyAction = 'scroll', emptyHref = '/category' }) {
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
                <div className="flex flex-col items-center py-24 ">
                    <p className="text-zinc-500 mb-6 text-lg">최근에 조회한 상품이 아직 없습니다</p>
                    {emptyAction === 'link' ? (
                        <Link
                            href="/"
                            className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full font-semibold hover:bg-zinc-800 transition-colors cursor-pointer "
                        >
                            카테고리 보러가기
                        </Link>
                    ) : (
                        <button
                            onClick={scrollToCategory}
                            className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                            카테고리 둘러보기
                        </button>
                    )}
                </div>
            ) : (
                <ProductCardGrid gridClass={gridClass} productInfo={recentProducts} isLoading={false} />
            )}
        </div>
    );
}
