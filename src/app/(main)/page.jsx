//홈페이지 메인 콘텐츠 정의
//app/(main)/page.jsx

import RecentProducts from '@/components/ui/RecentProducts';
import RecentKeywordRecommend from '@/components/ui/RecentKeywordRecommend';
import CategoryList from '@/components/ui/CategoryList';
import RecommendedVideos from '@/components/ui/RecommendVideo';

export default function Home() {
    return (
        <div className="bg-zinc-50 font-sans ">
            <div className="max-w-screen-xl mx-auto p-5 bg-white ">
                <section className="border ">
                    <CategoryList />
                </section>
                <section className="border mt-8 p-8">
                    <RecommendedVideos />
                    <RecentKeywordRecommend />
                </section>
                <section className="border mt-8 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">최근 본 상품</h2>
                    <RecentProducts />
                </section>
            </div>
        </div>
    );
}
