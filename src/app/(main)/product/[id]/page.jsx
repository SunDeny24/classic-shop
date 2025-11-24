//상품의 [id]의 page 화면정의
// src/app/(main)/product/[id]/page.jsx

export default async function ProductDetail({ params }) {
    const { id } = await params;
    console.log('id : ', id);
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="border p-5">
                <h1>{id} 의 상품 상세페이지</h1>
                <p>app/(main)/product/[id]/page</p>
            </div>
        </div>
    );
}
