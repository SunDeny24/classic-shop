// src/components/ui/RecentKeywordRecommend
// 최근 검색 기반 추천상품 컴포넌트

'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCardGrid from './ProductCardGrid';

export default function RecentKeywordRecommend() {
    const [keyword, setKeyword] = useState('');
    const { products, loading, error } = useProducts(keyword);
    const gridClass = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10'; //상품그리드 css 설정

    useEffect(() => {
        //로컬스토리지에서 최근 검색어 배열에 최신 키워드 가져옴
        const saved = localStorage.getItem('recent_searches');

        if (saved) {
            const parse = JSON.parse(saved);
            if (Array.isArray(parse) && parse.length > 0) {
                setKeyword(parse[0]);
            }
        }
    }, []);

    // 최근 검색어 없는 경우
    if (!keyword || (!loading && products.length === 0)) {
        return null;
    }

    return (
        <div className="w-full py-8">
            <div className="flex flex-wrap items-center gap-4 mb-8">
                <h3 className="text-xl font-medium text-zinc-800">
                    최근 관심을 가지셨던 <span className="text-2xl text-blue-700">{keyword}</span> 테마에요
                </h3>
                {/* 조건: 로딩 중이 아니고, 데이터가 4개를 초과할 때만 '더보기' 노출 */}
                {!loading && products.length > 6 && (
                    <Link
                        href={`/search/${encodeURIComponent(keyword)}`}
                        className="group flex items-center gap-1 px-3 py-1.5 border border-zinc-300 rounded-md text-xs font-medium text-zinc-500 hover:text-blue-600 hover:border-blue-600 transition-all duration-200"
                    >
                        더보기
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                )}
            </div>
            {loading ? (
                //로딩중이면 스켈레톤만 보여줌
                <ProductCardGrid gridClass={gridClass} productInfo={[]} isLoading={true} skeletonCount={4} />
            ) : products.length > 0 ? (
                <ProductCardGrid gridClass={gridClass} productInfo={products.slice(0, 6)} isLoading={false} />
            ) : (
                /* 로딩이 끝났는데 데이터가 0개인 경우 */
                <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-2xl">
                    <p className="text-zinc-600 font-light italic">
                        "{keyword}" 에 대한 추천 상품 데이터가 충분하지 않습니다.
                    </p>
                    <p className="text-xs text-zinc-500 mt-2">다른 키워드로 검색해 보세요.</p>
                </div>
            )}
        </div>
    );
}
