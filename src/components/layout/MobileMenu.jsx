// 'use client';
import Link from 'next/link';
export default function MobileMenu({ open, setOpen }) {
    //console.log('MobileMenu');
    //★ open, setOpen에 따라서 모바일 반응형 수정하기
    return (
        <div className="w-full bg-white border-gray-200 sticky top-0 z-20">
            <div id="mobile-menu" className="hidden md:hidden bg-white shadow-lg p-4">
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="검색"
                        data-search-open
                        className="border border-gray-300 rounded-full py-2 px-4 w-full"
                    />
                    <button data-search-open className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                            className="w-5 h-5"
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
                <nav className="flex flex-col space-y-2 mb-4">
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        아우터
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        상의
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        하의
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        패션소품
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        신발
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        가방
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        속옷/홈웨어
                    </Link>
                    <Link href="#" className="text-gray-700 font-medium p-2 rounded hover:bg-gray-100">
                        스포츠
                    </Link>
                </nav>
                <div className="flex items-center space-x-4 border-t pt-4">
                    <Link href="wishlist.html" className="text-gray-600 hover:text-black flex items-center gap-1">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                            ></path>
                        </svg>
                        <span>찜하기</span>
                    </Link>
                    <Link href="/cart" className="text-gray-600 hover:text-black flex items-center gap-1">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            ></path>
                        </svg>
                        <span>장바구니</span>
                    </Link>
                    <Link href="/mypage" className="text-gray-600 hover:text-black flex items-center gap-1">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                        <span>마이페이지</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
