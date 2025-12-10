//검색 데이터 데이터 넘겨주는 클라이언트 컴포넌트
'use client';
import { useProducts } from '@/hooks/useProducts';
import ProductCardGrid from '@/components/ui/ProductCardGrid';

export default function ProductResults({ query }) {
    const { products, loading, error, loadMore } = useProducts(query);
    const gridClass = 'grid grid-cols-2 md:grid-cols-4 gap-4';
    //추후에 ui 변경예정
    if (loading) return <p>로딩중...</p>;
    if (error) return <p>에러: {error}</p>;

    if (!products || products.length === 0) return <p>상품이 없습니다.</p>;

    return (
        <div className="max-w-screen-xl mx-auto p-5 bg-white">
            <ProductCardGrid gridClass={gridClass} productInfo={products} />
            <div className="flex justify-center mt-10">
                <button
                    onClick={loadMore}
                    className="px-4 py-3 rounded border border-gray-300 hover:bg-zinc-100"
                    disabled={loading}
                >
                    {loading ? '불러오는 중...' : '더 보기'}
                </button>
            </div>
        </div>
    );
}
