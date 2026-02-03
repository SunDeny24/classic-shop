// 마이페이지 UI 컴포넌트
'use client';

import LikeList from './LikeList';
import RecentProducts from './RecentProducts';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyPageClient() {
    const [likesCount, setLikesCount] = useState([]);

    useEffect(() => {
        const savedLikes = localStorage.getItem('wishList');
        const parseLikes = savedLikes ? JSON.parse(savedLikes) : [];
        const savedCount = parseLikes.length;
        setLikesCount(savedCount);
    }, []);

    return (
        <div>
            {/* 헤더 */}
            <div className="px-4 py-8 mb-6">
                <div className="max-w-7xl mx-auto flex items-center space-x-4 ">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">반가워요, 스키퍼님! </h2>
                        <p className="text-sm text-gray-500">로그인 없이 사용 중입니다 (데이터는 브라우저에 저장됨)</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 space-y-8">
                {/* 위시리스트, 장바구니 갯수 안내 카드 */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2">
                            <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 20 20">
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </div>
                        <span className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">
                            Wishlist
                        </span>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-black text-gray-800">{likesCount}</span>
                            <span className="text-gray-400 text-sm">개</span>
                        </div>
                    </div>

                    <button className="bg-blue-600 p-5 rounded-2xl shadow-md shadow-blue-100 flex flex-col items-center justify-center relative active:scale-95 transition-transform">
                        <div className="absolute top-2 right-3">
                            <div className="bg-white text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                                GO
                            </div>
                        </div>
                        <span className="text-blue-100 text-xs font-medium mb-1 uppercase tracking-wider">Cart</span>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-black text-white">3</span>
                            <span className="text-blue-100 text-sm">개</span>
                        </div>
                    </button>
                </div>

                {/* 위시리스트 */}
                <section>
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-xl font-bold text-gray-800">내가 찜한 상품</h3>
                        <Link href="/wishlist" className="text-sm text-gray-400 hover:text-blue-500">
                            전체보기
                        </Link>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                        <LikeList limit={4} />
                    </div>
                </section>

                {/* 최근 본 상품 */}
                <section>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">최근 본 상품</h3>
                    <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                        <RecentProducts />
                    </div>
                </section>
            </div>

            <div className="bg-gray-100 p-4 text-center">
                <p className="text-xs text-gray-500 leading-relaxed">
                    마이페이지 보관함 데이터는 브라우저 쿠키/로컬 스토리지를 기반으로 합니다. 브라우저를 초기화하거나
                    다른 기기에서 접속하면 데이터가 보이지 않을 수 있습니다.
                </p>
            </div>
        </div>
    );
}
