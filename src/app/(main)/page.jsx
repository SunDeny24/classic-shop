//홈페이지 메인 콘텐츠 정의

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
            <div className="border p-5 bg-white">
                <h1>메인화면입니다</h1>
                <p>app/(main)/page</p>
                <p>날씨배너</p>
                <p>카테고리목록</p>
                <p>최근본상품</p>
            </div>
        </div>
    );
}
