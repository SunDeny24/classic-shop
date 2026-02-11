'use client';
import { useState, useMemo, useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductCardGrid from '@/components/ui/ProductCardGrid';

export default function ProductResults({ query, category }) {
    const { products, loading, error, sortType, setSortType, loadMore } = useProducts(query); //useProduct 훅 데이터
    const gridClass = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10'; //상품그리드 css 설정

    // 카테고리 상태관리
    const [selectedCategory, setSelectedCategory] = useState({
        cat2: '', // 중분류
        cat3: '', // 소분류
        cat4: '', // 세분류
    });

    // 필터 상태 관리 (중고, 단종, 판매예정)
    const [filters, setFilters] = useState({
        excludeUsed: true,
        excludeDiscontinued: true,
        excludeGlobal: true,
    });

    /* -------카테고리 추출 및 계층화------- */
    const categoryMenu = useMemo(() => {
        // 데이터 없으면 빈객체반환
        if (!products) return { cat1: [], cat2: [], cat3: [], cat4: [] };

        // 이름을 키로, 개수를 값으로 갖는 Map 객체 생성
        const cat1Map = new Map();
        const cat2Map = new Map();
        const cat3Map = new Map();
        const cat4Map = new Map();

        // 하나씩 확인해서 중분류, 소분류, 세분류 데이터 추출
        products.forEach((item) => {
            // 대분류 카운팅 (검색된 전체 데이터 기준)
            if (item.category1) {
                cat1Map.set(item.category1, (cat1Map.get(item.category1) || 0) + 1);
            }
            // 중분류 카운팅
            if (item.category2) {
                cat2Map.set(item.category2, (cat2Map.get(item.category2) || 0) + 1);
            }

            // 현재 선택된 중분류가 있으면 하위에 소분류데이터 추가
            if (selectedCategory.cat2 === item.category2 && item.category3) {
                cat3Map.set(item.category3, (cat3Map.get(item.category3) || 0) + 1);
            }

            // 현재 선택된 소분류가 있다면 그 하위 세분류 추가
            if (selectedCategory.cat3 === item.category3 && item.category4) {
                cat4Map.set(item.category4, (cat4Map.get(item.category4) || 0) + 1);
            }
        });

        //카테고리 데이터 반환(배열형태)
        return {
            cat1: Array.from(cat1Map, ([name, count]) => ({ name, count })),
            cat2: Array.from(cat2Map, ([name, count]) => ({ name, count })),
            cat3: Array.from(cat3Map, ([name, count]) => ({ name, count })),
            cat4: Array.from(cat4Map, ([name, count]) => ({ name, count })),
        };
    }, [products, selectedCategory.cat2, selectedCategory.cat3]);

    // 상위 카테고리를 바뀔때 하위 카테고리는 초기화
    const handleCat2Click = (name) => {
        setSelectedCategory({ cat2: name, cat3: '', cat4: '' });
    };

    /* -------최근 행동 추천상품 섹션------- */
    useEffect(() => {
        if (query) {
            const saved = localStorage.getItem('recent_searches');
            const prevSearches = saved ? JSON.parse(saved) : [];

            // 현재 키워드를 맨 앞으로 보내고 중복 제거 (최대 10개)
            const updatedSearches = [query, ...prevSearches.filter((item) => item !== query)].slice(0, 10);

            localStorage.setItem('recent_searches', JSON.stringify(updatedSearches));
        }
    }, [query]);

    // 토글 핸들러 함수
    const handleToggle = (key) => {
        setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    /* -------데이터 정제 로직------- */
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
            //홈에서 카테고리(대분류) 타고 들어온 경우 해당 카테고리랑 일치하는지 검사
            if (category && item.category1 !== category) {
                return false;
            }
            //중분류 선택시(cat2) 상품의 category2값이 일치하는지 확인
            if (selectedCategory.cat2 && item.category2 !== selectedCategory.cat2) {
                return false;
            }
            //소분류 선택시(cat3) 상품의 category3값이 일치하는지 확인
            if (selectedCategory.cat3 && item.category3 !== selectedCategory.cat3) {
                return false;
            }
            //세분류 선택시(cat4) 상품의 category4값이 일치하는지 확인
            if (selectedCategory.cat4 && item.category4 !== selectedCategory.cat4) {
                return false;
            }

            return true;
        });
    }, [products, filters, category, selectedCategory]);

    if (error) return <p className="p-10 text-center text-red-400">에러: {error}</p>;

    return (
        <div className="flex flex-col md:flex-row w-full bg-white min-h-screen">
            {/* [SIDEBAR] 필터 영역 */}
            <aside className="w-full md:w-80 flex-shrink-0 border-b md:border-b-0 md:border-r border-zinc-200 bg-white md:h-screen md:sticky md:top-0">
                <div className="flex flex-col h-full">
                    {/* 상단 필터 옵션 영역 */}
                    <div className="p-8 flex-1">
                        <h1 className="text-2xl font-semibold text-center mb-12 text-zinc-900 border-b border-zinc-200 pb-4">
                            필터
                        </h1>

                        <div className="space-y-15">
                            <div>
                                <h2 className="text-[15px] font-bold text-stone-700 mb-6">CATEGORY</h2>
                                {/* 중분류 (Category 2) */}
                                <div className="flex flex-col gap-2">
                                    <select
                                        className="text-sm py-2 focus:outline-none"
                                        value={selectedCategory.cat2}
                                        onChange={(e) =>
                                            setSelectedCategory({ cat2: e.target.value, cat3: '', cat4: '' })
                                        }
                                    >
                                        <option value="">중분류 전체 ({products.length})</option>
                                        {categoryMenu.cat2.map((item) => (
                                            <option key={item.name} value={item.name}>
                                                {item.name}({item.count})
                                            </option>
                                        ))}
                                    </select>
                                    {/* 소분류 (Category 3) : 중분류 선택되었고 데이터 있으면 표시 */}
                                    {selectedCategory.cat2 && categoryMenu.cat3.length > 0 && (
                                        <select
                                            className="text-xs  py-2 focus:outline-none ml-2"
                                            value={selectedCategory.cat3}
                                            onChange={(e) =>
                                                setSelectedCategory((prev) => ({
                                                    ...prev,
                                                    cat3: e.target.value,
                                                    cat4: '',
                                                }))
                                            }
                                        >
                                            <option value="">소분류 전체</option>
                                            {categoryMenu.cat3.map((item) => (
                                                <option key={item.name} value={item.name}>
                                                    {item.name}({item.count})
                                                </option>
                                            ))}
                                        </select>
                                    )}

                                    {/* 세분류 (cat4): 소분류가 선택되었고 데이터가 있으면 표시 */}
                                    {selectedCategory.cat3 && categoryMenu.cat4.length > 0 && (
                                        <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-300">
                                            <label className="text-[11px] text-zinc-400 uppercase font-bold tracking-wider">
                                                세분류
                                            </label>
                                            <select
                                                className="text-xs py-2 focus:outline-none bg-transparent cursor-pointer hover:border-zinc-900 transition-colors"
                                                value={selectedCategory.cat4}
                                                onChange={(e) =>
                                                    setSelectedCategory((prev) => ({ ...prev, cat4: e.target.value }))
                                                }
                                            >
                                                <option value="">세분류 전체 </option>
                                                {categoryMenu.cat4.map((item) => (
                                                    <option key={item.name} value={item.name}>
                                                        {item.name}({item.count})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                {/* 가이드 섹션 */}
                                <div className="mb-6">
                                    <h2 className="text-[15px] font-bold text-stone-700 mb-3 \">DETAIL OPTION</h2>
                                    <div className="p-4 bg-zinc-50 border-zinc-900 rounded-r-md">
                                        <p className="text-[12px] text-zinc-500 leading-5">
                                            <span className="text-stone-700 font-bold block mb-1">Picker's Guide</span>
                                            빠른 선택을 위해{' '}
                                            <span className="text-stone-700  font-semibold">새 상품</span> 위주로 먼저
                                            정리해 두었습니다.
                                            <br />
                                            빈티지나 해외 직구 상품까지 넓게 보고 싶다면 토글을 꺼주세요!
                                        </p>
                                    </div>
                                </div>

                                {/* 토글 스위치 리스트 */}
                                <div className="space-y-5 px-1">
                                    <FilterToggle
                                        label="신상품만 보기"
                                        subLabel="중고/구제 아이템 제외"
                                        checked={filters.excludeUsed}
                                        onChange={() => handleToggle('excludeUsed')}
                                    />
                                    <FilterToggle
                                        label="판매 중인 상품만"
                                        subLabel="단종된 모델 제외"
                                        checked={filters.excludeDiscontinued}
                                        onChange={() => handleToggle('excludeDiscontinued')}
                                    />
                                    <FilterToggle
                                        label="국내 배송 상품만"
                                        subLabel="해외 직구/대행 제외"
                                        checked={filters.excludeGlobal}
                                        onChange={() => handleToggle('excludeGlobal')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 하단 영역 */}
                    <div className="p-8 border-t border-zinc-100 bg-zinc-50/50 mt-auto">
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-light tracking-wide italic">
                            네이버 쇼핑 API 실시간 데이터를 기반으로
                            <br />
                            필터를 통한 쇼핑 데이터를 제공합니다.
                        </p>
                    </div>
                </div>
            </aside>

            {/* [MAIN] 상품 결과 영역 */}
            <main className="flex-1 p-5 md:p-10 ">
                {/* 정렬 셀렉트 */}
                <div className="grid justify-items-end">
                    <span className="text-xs text-zinc-500">
                        가장 정확도 높은 상위 100개의 아이템을 먼저 엄선했습니다. 'More'를 눌러 탐색을 이어가세요.
                    </span>
                </div>
                <div className="flex items-center gap-2 ">
                    <span className="text-2xl font-bold text-zinc-900">{curatedProducts.length}</span>
                    <span className="text-sm text-zinc-500 font-light">Products Found</span>
                </div>
                {(selectedCategory.cat2 || selectedCategory.cat3) && (
                    <div className="flex gap-2 flex-wrap">
                        {selectedCategory.cat2 && (
                            <span className="px-3 py-1 bg-zinc-100 text-[10px] font-bold rounded-full border border-zinc-200">
                                {selectedCategory.cat2}
                            </span>
                        )}
                        {selectedCategory.cat3 && (
                            <span className="px-3 py-1 bg-zinc-100 text-[10px] font-bold rounded-full border border-zinc-200">
                                {selectedCategory.cat3}
                            </span>
                        )}
                        <button
                            onClick={() => setSelectedCategory({ cat2: '', cat3: '', cat4: '' })}
                            className="text-[10px] text-zinc-400 underline underline-offset-4 hover:text-zinc-900"
                        >
                            필터 초기화
                        </button>
                    </div>
                )}

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
