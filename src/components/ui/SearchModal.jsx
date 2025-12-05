//검색 모달 화면

import Link from 'next/link';

export default function SearchModal({ closeSearch }) {
    console.log('SearchModal열림');
    return (
        <div className="fixed inset-0 bg-white z-[999] p-4 md:p-8 ">
            <button
                onClick={closeSearch}
                className="top-6 right-6 md:top-8 md:right-8 text-gray-500 hover:text-black z-[1000]"
            >
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
            <div className="max-w-3xl mx-auto">
                <div className="relative mt-12">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full text-2xl md:text-3xl font-medium border-b-2 border-black py-3 focus:outline-none"
                        autoFocus="true"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-black">
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 검색어</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/search/아우터"
                            className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200"
                        >
                            아우터
                        </Link>
                        <Link
                            href="/search/패딩"
                            className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200"
                        >
                            패딩
                        </Link>
                        <Link
                            href="/search/부츠"
                            className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-200"
                        >
                            부츠
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
