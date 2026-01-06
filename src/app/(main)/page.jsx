//홈페이지 메인 콘텐츠 정의
//app/(main)/page.jsx

'use client';

import ProductCardGrid from '@/components/ui/ProductCardGrid';
import { useProducts } from '@/hooks/useProducts';

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
                    <h2 className="text-2xl font-bold mb-6 text-center">제안 섹션</h2>
                </section>
                <section className="border">
                    <h2 className="text-2xl font-bold mb-6 text-center">최근 본 상품</h2>
                </section>
            </div>
        </div>
    );
}
