// src/components/ui/CategoryList
// 카테고리 리스트 컴포넌트

'use client';

import { useRouter } from 'next/navigation';
export default function CategoryList() {
    const NAVER_DISPLAY_CATEGORIES = [
        { id: 1, name: '패션의류', icon: '👕', color: 'bg-green-50' },
        { id: 2, name: '패션잡화', icon: '👜', color: 'bg-orange-50' },
        { id: 3, name: '화장품/미용', icon: '💄', color: 'bg-pink-50' },
        { id: 4, name: '디지털/가전', icon: '💻', color: 'bg-slate-100' },
        { id: 5, name: '가구/인테리어', icon: '🏠', color: 'bg-amber-50' },
        { id: 6, name: '출산/육아', icon: '🍼', color: 'bg-emerald-50' },
        { id: 7, name: '식품', icon: '🍎', color: 'bg-red-50' },
        { id: 8, name: '스포츠/레저', icon: '⚽', color: 'bg-indigo-50' },
        { id: 9, name: '생활/건강', icon: '🧼', color: 'bg-teal-50' },
        { id: 10, name: '여가/생활편의', icon: '🎸', color: 'bg-purple-50' },
    ];
    const router = useRouter();

    const handleCategoryClick = (name) => {
        const url = `/search/${encodeURIComponent(name)}?category=${encodeURIComponent(name)}`;
        router.push(url);
    };

    return (
        <section id="category-section" className="py-12 px-6 max-w-screen-xl mx-auto">
            {/* 상단 텍스트 크기도 소폭 조정 */}
            <div className="flex flex-col mb-8">
                <h2 className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-1">
                    Browse by Category
                </h2>
                <h3 className="text-3xl font-bold text-zinc-900 ">카테고리</h3>
            </div>

            {/* 그리드 설정 수정: 기본 2열 / md 5열로 배치하여 크기 축소 */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {NAVER_DISPLAY_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="group relative overflow-hidden rounded-xl border border-zinc-100 bg-white p-4 py-6 transition-all duration-300 hover:border-zinc-900 hover:shadow-md hover:-translate-y-1"
                    >
                        {/* 배경 효과 */}
                        <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cat.color} -z-10`}
                        />

                        <div className="flex flex-col items-center gap-2">
                            {/* 아이콘 영역 */}
                            <span className="text-3xl transform transition-transform duration-500 group-hover:scale-110">
                                {cat.icon}
                            </span>

                            {/* 텍스트 영역 */}
                            <span className="block text-sm font-bold text-zinc-800 ">{cat.name}</span>
                        </div>
                        {/* 우측 상단 화살표 장식 */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <svg
                                className="w-4 h-4 text-zinc-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}
