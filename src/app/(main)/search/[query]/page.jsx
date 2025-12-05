// 검색결과 [query]의 화면구성 서버 컴포넌트
// src/app/(main)/search/[query]/page.jsx
'use client';

import ProductResults from '@/components/search/ProductResults';

export default async function SearchPage({ params }) {
    const { query } = await params;
    const keyword = decodeURIComponent(query); //디코딩함수사용

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="border p-5">
                <h1>"{keyword}"의 검색결과</h1>
                <ProductResults query={keyword} />
            </div>
        </div>
    );
}
