//홈페이지 메인 콘텐츠 정의
//app/(main)/page.jsx

import RecentProducts from '@/components/ui/RecentProducts';
import RecentKeywordRecommend from '@/components/ui/RecentKeywordRecommend';
import CategoryList from '@/components/ui/CategoryList';
import RecommendedVideos from '@/components/ui/RecommendVideo';

export default function Home() {
    //최근 본 상품 view css class 정의하고 limit-4로 데이터 제한해서 페칭해오기

    //최근 본 상품 구현시 변경하기
    // const { products, loading, error, refetch } = useProducts('셔츠');
    // //추후에 ui 변경예정
    // if (loading) return <p>로딩중...</p>;
    // if (error) return <p>에러: {error}</p>;
    // if (!products || products.length === 0) return <p>상품이 없습니다.</p>;

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
                    <RecentProducts />
                </section>
            </div>
        </div>
    );
}
