//상품의 [id]의 page 화면정의 가져온 데이터를 넘겨줌
// src/app/(main)/product/[id]/page.jsx

import ProductResultDetail from '@/components/search/ProductResultDetail';
import RecentKeywordRecommend from '@/components/ui/RecentKeywordRecommend';

export default async function ProductDetail({ params }) {
    const { id } = await params;
    return (
        <div className="max-w-5xl mx-auto px-4 space-y-10">
            <section className="p-5">
                <ProductResultDetail />
            </section>
            <section className="p-5">
                <RecentKeywordRecommend />
            </section>
        </div>
    );
}
