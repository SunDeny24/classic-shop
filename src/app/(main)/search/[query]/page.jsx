// 검색결과 [query]의 화면구성 서버 컴포넌트
// src/app/(main)/search/[query]/page.jsx

import ProductResults from '@/components/search/ProductResults';

export default async function SearchPage({ params, searchParams }) {
    const { query } = await params;
    const { category } = await searchParams;

    const keyword = decodeURIComponent(query); //디코딩함수사용
    const categoryName = category ? decodeURIComponent(category) : null;

    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
            <div className="w-full max-w-[1600px] mx-auto p-5 py-1">
                <h1 className="p-5 text-3xl font-medium text-center ">
                    {
                        //카테고리 이름이 있으면 카테고리로, 아니면 검색결과로 표시
                        categoryName ? (
                            <>
                                <span className="text-zinc-400 text-xl font-normal mb-1 mr-2">Category</span>
                                {categoryName}
                            </>
                        ) : (
                            <>
                                "{keyword}" <span className="text-xl">의 검색결과</span>
                            </>
                        )
                    }
                </h1>
            </div>
            <div className="flex-1 w-full max-w-[1600px] mx-auto pb-10">
                <div className="flex h-full min-h-[70vh] ">
                    <ProductResults query={keyword} category={categoryName} />
                </div>
            </div>
        </div>
    );
}
