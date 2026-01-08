'use client';
import { useState, useMemo } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCardGrid from '@/components/ui/ProductCardGrid';

export default function ProductResults({ query }) {
    const { products, loading, error, sortType, setSortType, loadMore } = useProducts(query); //useProduct 훅 데이터
    const gridClass = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10'; //상품그리드 css 설정

    // 필터 상태 관리 (중고, 단종, 판매예정)
    const [filters, setFilters] = useState({
        excludeUsed: true,
        excludeDiscontinued: true,
        excludeGlobal: true,
    });

    // 토글 핸들러 함수
    const handleToggle = (key) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // 데이터 정제 로직
    const curatedProducts = useMemo(() => {
        if (!products) return [];

        return products.filter((item) => {
            const type = Number(item.productType); //타입 숫자로 변환
            if (!item) return false;

            // 중고 제외 (productType: '4,5,6' / mallName과 title에 '중고','구제' 포항 여부)
            if (filters.excludeUsed) {
                const isUsed =
                    (type >= 4 && type <= 6) ||
                    item.mallName?.includes('중고') ||
                    item.mallName?.includes('구제') ||
                    item.title?.includes('중고');
                if (isUsed) return false;
            }
            // 단종상품 제외 (productType: '7,8,9')
            if (filters.excludeDiscontinued) {
                if (type >= 7 && type <= 9) return false;
            }
            // 해외직구 제외 (mallName에 '해외','직구','구매대행' 포함 여부)
            if (filters.excludeGlobal) {
                const isGlobal =
                    item.mallName?.includes('해외') ||
                    item.mallName?.includes('직구') ||
                    item.mallName?.includes('구매대행');
                if (isGlobal) return false;
            }
            return true;
        });
    }, [products, filters]);

    if (error) return <p className="p-10 text-center text-red-400">에러: {error}</p>;

    return (
        <div className="flex flex-col md:flex-row w-full bg-white min-h-screen">
            {/* [SIDEBAR] 필터 영역 */}
            <aside className="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-zinc-200 bg-white md:h-screen md:sticky md:top-0">
                <div className="flex flex-col h-full">
                    {/* 상단 필터 옵션 영역 (flex-1을 주어 남은 공간을 차지하게 함) */}
                    <div className="p-8 flex-1">
                        <h1 className="text-xl font-bold tracking-tighter mb-12 uppercase font-mono text-zinc-900 italic">
                            Filter
                        </h1>

                        <div className="space-y-10">
                            <div>
                                <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-8">
                                    Product Option
                                </h2>
                                <div className="space-y-6">
                                    <FilterToggle
                                        label="중고 제품 제외"
                                        checked={filters.excludeUsed}
                                        onChange={() => handleToggle('excludeUsed')}
                                    />
                                    <FilterToggle
                                        label="단종 제품 제외"
                                        checked={filters.excludeDiscontinued}
                                        onChange={() => handleToggle('excludeDiscontinued')}
                                    />
                                    <FilterToggle
                                        label="해외직구 제외"
                                        checked={filters.excludeGlobal}
                                        onChange={() => handleToggle('excludeGlobal')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 하단 영역 */}
                    <div className="p-8 border-t border-zinc-100 bg-zinc-50/50 mt-auto">
                        <p className="text-[9px] text-zinc-400 leading-relaxed font-light tracking-wide italic">
                            네이버 쇼핑 API 실시간 데이터를 기반으로
                            <br />
                            사용자 맞춤형 큐레이션을 제공합니다.
                        </p>
                    </div>
                </div>
            </aside>

            {/* [MAIN] 상품 결과 영역 */}
            <main className="flex-1 p-5 md:p-10">
                {/* 정렬 셀렉트 */}
                <div className="mb-8 border-b border-zinc-100 pb-4 flex justify-end">
                    <div className="relative inline-block w-40">
                        <select
                            value={sortType}
                            onChange={(e) => setSortType(e.target.value)}
                            className="block w-full cursor-pointer appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-2 pr-8 text-sm text-zinc-700 transition-all hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-100"
                        >
                            <option value="default">정확도순</option>
                            <option value="low">낮은가격순</option>
                            <option value="high">높은가격순</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-400">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 상품 그리드 */}
                {loading && (
                    //로딩중이면 스켈레톤만 보여줌
                    <ProductCardGrid gridClass={gridClass} productInfo={[]} isLoading={true} />
                )}
                {!loading && curatedProducts.length > 0 && (
                    //로딩끝났고 데이터 있음 실제 그리드 보여주기
                    <ProductCardGrid gridClass={gridClass} productInfo={curatedProducts} isLoading={false} />
                )}
                {!loading && curatedProducts.length === 0 && (
                    //로딩끝났는데도 데이터 없음
                    <div className="py-20 text-center text-zinc-400 font-light italic">
                        조건에 맞는 결과가 없습니다.
                    </div>
                )}

                {/* 더보기 버튼 */}
                <div className="flex justify-center mt-16 mb-10">
                    <button
                        onClick={loadMore}
                        disabled={loading}
                        className="px-10 py-3 rounded border border-zinc-200 text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-all disabled:opacity-20"
                    >
                        {loading ? '불러오는 중...' : 'More'}
                    </button>
                </div>
            </main>
        </div>
    );
}

/**
 * 토글 스위치 컴포넌트
 */
function FilterToggle({ label, checked, onChange }) {
    return (
        <label className="flex items-center justify-between cursor-pointer group">
            <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900 transition-colors">
                {label}
            </span>
            <div className="relative">
                <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
                <div className="block bg-zinc-200 w-10 h-5 rounded-full transition-colors peer-checked:bg-zinc-900"></div>
                <div className="absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
        </label>
    );
}
