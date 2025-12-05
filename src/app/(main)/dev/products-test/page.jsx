//네이버 api 호출 테스트용 클라이언트 컴포넌트
//http://localhost:3000/dev/products-test
//app/(main)/dev/products-test

'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCardGrid from '@/components/ui/ProductCardGrid';

export default function ProductTestPage() {
    //셔츠라는 query 데이터(검색어)를 넘겨서 fetch
    const { products, loading, error, refetch } = useProducts('셔츠');

    //추후에 ui 변경예정
    if (loading) return <p>로딩중...</p>;
    if (error) return <p>에러: {error}</p>;
    if (!products || products.length === 0) return <p>상품이 없습니다.</p>;

    return (
        <div className="p-6">
            <h1>네이버 패션 상품 테스트</h1>
            <div>
                <button
                    className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200"
                    onClick={refetch}
                >
                    다시 불러오기
                </button>
            </div>
            <ProductCardGrid className="grid grid-cols-2 md:grid-cols-4 gap-4" productInfo={products} />
        </div>
    );
}
