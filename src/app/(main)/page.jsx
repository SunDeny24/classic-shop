//홈페이지 메인 콘텐츠 정의
//app/(main)/page.jsx

import RecentProducts from '@/components/ui/RecentProducts';
import RecommendSection from '@/components/ui/RecommendSection';
import CategoryList from '@/components/ui/CategoryList';

export default function Home() {
    return (
        <div className="w-full bg-white">
            {/* 카테고리 섹션 */}
            <section className="max-w-screen-xl mx-auto ">
                <CategoryList />
            </section>
            {/* 추천상품 섹션 */}
            <section className="w-full bg-zinc-100 mt-8 py-12 ">
                <RecommendSection />
            </section>
            {/* 최근 본 상품 섹션 */}
            <section className="max-w-screen-xl mx-auto mt-8 p-8">
                <div className="flex flex-col mb-8">
                    <h2 className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-1">
                        Recently Viewed Products
                    </h2>
                    <h3 className="text-2xl font-bold text-zinc-900 ">최근 본 상품</h3>
                </div>
                <RecentProducts />
            </section>
        </div>
    );
}
