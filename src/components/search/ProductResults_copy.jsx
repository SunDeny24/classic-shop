// 검색 상품목록 데이터 넘겨주는 클라이언트 컴포넌트
// src/components/search/ProductResults.jsx
'use client';
import { useProducts } from '@/hooks/useProducts';
import ProductCardGrid from '@/components/ui/ProductCardGrid';

export default function ProductResults({ query }) {
    const { products, loading, error, sortType, setSortType, loadMore } = useProducts(query);
    const gridClass = 'grid grid-cols-2 md:grid-cols-4 gap-4';

    // const getBtnStyle = (currentSort) => {
    //     const baseStyle = 'px-4 py-2 rounded-full text-sm transition-all ';
    //     return sortType === currentSort
    //         ? baseStyle + 'bg-black text-white font-bold' // 선택됨
    //         : baseStyle + 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'; // 안됨
    // };

    //추후에 ui 변경예정
    if (loading) return <p>로딩중...</p>;
    if (error) return <p>에러: {error}</p>;

    if (!products || products.length === 0) return <p>상품이 없습니다</p>;

    return (
        <div className="max-w-screen-xl mx-auto p-5 bg-white">
            {/* 정렬 버튼 그룹 - 추후 결정 */}
            {/* <div className="flex gap-2 mb-8 border-b pb-4">
                <button onClick={() => setSortType('default')} className={getBtnStyle('default')}>
                    정확도순
                </button>
                <button onClick={() => setSortType('low')} className={getBtnStyle('low')}>
                    낮은가격순
                </button>
                <button onClick={() => setSortType('high')} className={getBtnStyle('high')}>
                    높은가격순
                </button>
            </div> */}
            <div className="mb-8 border-b pb-4 flex justify-end">
                <div className="relative inline-block w-40 ">
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="block w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-sm leading-tight text-gray-700 transition-all hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="default">정확도순</option>
                        <option value="low">낮은가격순</option>
                        <option value="high">높은가격순</option>
                    </select>

                    {/* 우측 화살표 아이콘 커스텀 */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* 상품 목록 표시 */}
            <ProductCardGrid gridClass={gridClass} productInfo={products} />

            {/* 더보기 버튼 */}
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
