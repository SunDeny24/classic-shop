//상품의 [id]의 page 화면정의 가져온 데이터를 넘겨줌
// src/app/(main)/product/[id]/page.jsx

import ProductResultDetail from '@/components/search/ProductResultDetail';

export default async function ProductDetail({ params }) {
    const { id } = await params;
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="border p-5">
                {/* <h1>{id} 의 상품 상세페이지</h1>*/}
                <ProductResultDetail />
            </div>
        </div>
    );
}
