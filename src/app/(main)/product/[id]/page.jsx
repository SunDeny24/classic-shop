//상품의 [id]의 page 화면정의 가져온 데이터를 넘겨줌
// src/app/(main)/product/[id]/page.jsx

import BackButton from '@/components/layout/BackButton';
import ProductResultDetail from '@/components/search/ProductResultDetail';
import RecentKeywordRecommend from '@/components/ui/RecentKeywordRecommend';

export default async function ProductDetail() {
    return (
        <div className="max-w-5xl mx-auto px-4 ">
            <nav className="pt-5 pb-5">
                <BackButton />
            </nav>

            <section className="pb-5 px-5">
                <ProductResultDetail />
            </section>
            <section className="py-5">
                <RecentKeywordRecommend />
            </section>
        </div>
    );
}
