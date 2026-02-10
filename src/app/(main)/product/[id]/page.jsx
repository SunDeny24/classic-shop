//상품의 [id]의 page 화면정의 가져온 데이터를 넘겨줌
// src/app/(main)/product/[id]/page.jsx

import BackButton from '@/components/layout/BackButton';
import ProductResultDetail from '@/components/search/ProductResultDetail';
import RecentKeywordRecommend from '@/components/ui/RecentKeywordRecommend';

export default async function ProductDetail() {
    return (
        <div className="max-w-5xl mx-auto px-4 space-y-10">
            <nav className="py-4">
                <BackButton />
            </nav>

            <section className="p-5">
                <ProductResultDetail />
            </section>
            <section className="p-5">
                <RecentKeywordRecommend />
            </section>
        </div>
    );
}
