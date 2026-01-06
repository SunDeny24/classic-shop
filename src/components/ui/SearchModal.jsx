'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchModal({ closeSearch }) {
    const router = useRouter();
    const [inputQuery, setInputQuery] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);

    //검색어 입력 이벤트처리
    const onInputSearch = (e) => {
        const { value } = e.target;
        setInputQuery(value);
    };
    //컴포넌트가 초기 로드시 로컬스토리지 확인
    useEffect(() => {
        const saved = localStorage.getItem('recent_searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    //검색어 저장 함수
    const saveRecentSearch = (query) => {
        //중복 검색어는 제거하고 새 키워드를 맨 앞으로, 최대 10개까지만 유지
        const newSearches = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 10);

        setRecentSearches(newSearches);
        localStorage.setItem('recent_searches', JSON.stringify(newSearches));
    };

    //개별 검색어 삭제 함수
    const deleteSearch = (e, target) => {
        e.preventDefault(); //Link 이동 방지
        e.stopPropagation(); //부모 클릭 방지

        const filtered = recentSearches.filter((item) => item !== target);
        setRecentSearches(filtered);
        localStorage.setItem('recent_searches', JSON.stringify(filtered));
    };

    //검색submit 이벤트
    const handlerSubmit = (e) => {
        e.preventDefault();
        const queryTrim = inputQuery.trim();

        if (!queryTrim) {
            alert('검색어를 입력하세요');
            return;
        }

        //검색 실행 전 저장 로직 실행
        saveRecentSearch(queryTrim);

        //특수문자 및 점(.) 처리 로직
        let encoded = encodeURIComponent(queryTrim); //검색어 인코딩
        if (encoded.includes('.')) {
            encoded = encoded.replace(/\./g, '%2E');
        }
        //search에 query값 넘겨줌
        const url = `/search/${encoded}`;

        try {
            router.push(url);
            closeSearch();
        } catch (err) {
            console.error('router.push 에러:', err);
        }

        router.push(`/search/${encodeURIComponent(queryTrim)}`);
        closeSearch();
    };

    return (
        <div className="fixed inset-0 bg-white z-[999] p-4 md:p-8 overflow-y-auto">
            {/* 닫기 버튼: 화면 우측 상단 고정 */}
            <button
                onClick={closeSearch}
                className="fixed top-6 right-6 md:top-10 md:right-10 text-gray-400 hover:text-black transition-colors z-[1000]"
            >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>

            <div className="max-w-3xl mx-auto pt-20">
                {/* 검색창 폼 */}
                <div className="relative mt-8">
                    <form onSubmit={handlerSubmit}>
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                            className="w-full text-2xl md:text-4xl font-medium border-b-2 border-black py-3 focus:outline-none pr-12"
                            autoFocus
                            value={inputQuery}
                            onChange={onInputSearch}
                        />
                        <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
                            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                    </form>
                </div>

                {/* 최근 검색어 표시 영역 */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">최근 검색어</h3>
                        {recentSearches.length > 0 && (
                            <button
                                onClick={() => {
                                    setRecentSearches([]);
                                    localStorage.removeItem('recent_searches');
                                }}
                                className="text-sm text-gray-400 hover:text-red-500 underline"
                            >
                                전체 삭제
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {recentSearches.length === 0 ? (
                            <p className="text-gray-400">최근 검색 내역이 없습니다.</p>
                        ) : (
                            recentSearches.map((keyword) => (
                                <div
                                    key={keyword}
                                    className="flex items-center bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    <Link
                                        href={`/search/${encodeURIComponent(keyword)}`}
                                        onClick={closeSearch}
                                        className="text-gray-700 font-medium"
                                    >
                                        {keyword}
                                    </Link>
                                    <button
                                        onClick={(e) => deleteSearch(e, keyword)}
                                        className="ml-2 p-0.5 hover:bg-gray-300 rounded-full"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
