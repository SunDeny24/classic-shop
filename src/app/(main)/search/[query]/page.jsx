// 검색결과 [query]의 화면구성
// src/app/(main)/search/[query]/page.jsx

export default async function SearchPage({ params }) {
    const { query } = await params;
    const keyword = decodeURIComponent(query); //디코딩함수사용
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="border p-5">
                <h1>{keyword}의 검색결과</h1>
                <p>app/(main)/search/[query]/page</p>
            </div>
        </div>
    );
}
