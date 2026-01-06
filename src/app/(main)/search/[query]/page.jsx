// 검색결과 [query]의 화면구성 서버 컴포넌트
// src/app/(main)/search/[query]/page.jsx

import ProductResults from '@/components/search/ProductResults';

export default async function SearchPage({ params }) {
    const { query } = await params;
    const keyword = decodeURIComponent(query); //디코딩함수사용
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
            <div className="w-full max-w-[1600px] mx-auto p-5 pb-0">
                <h1 className="p-5 text-3xl font-medium ">
                    "{keyword}" <span className="text-xl">의 검색결과</span>
                </h1>
            </div>
            <div className="flex-1 w-full max-w-[1600px] mx-auto pb-10">
                <div className="flex h-full min-h-[70vh] ">
                    {/* 이 안에 필터 사이드바와 ProductResults가 들어갑니다 */}
                    <ProductResults query={keyword} />
                </div>
            </div>
            <ProductResults query={keyword} />
        </div>
    );
}
