// src/components/layout/MobileMenu.jsx
'use client';

import Link from 'next/link';
import { useShopping } from '@/context/ShoppingContext';
import SearchBar from './SearchBar'; // 기존 SearchBar 임포트

export default function MobileMenu({ setOpen, isSearchOpen, setIsSearchOpen }) {
    const closeMenu = () => setOpen(false);
    const { cart, wishList } = useShopping([]);

    const wishListCount = wishList.length || 0;
    const cartCount = cart.length || 0;

    return (
        <div className="flex flex-col bg-white">
            {/* 기존 SearchBar 컴포넌트 */}
            <div className="p-4 border-b border-gray-100 md:hidden">
                <SearchBar open={isSearchOpen} setOpen={setIsSearchOpen} />
            </div>

            {/* 위시리스트 */}
            <Link
                href="/wishlist"
                onClick={closeMenu}
                className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50 group"
            >
                <span className="text-gray-700 font-medium group-hover:text-black">Wishlist</span>
                <div className="relative text-gray-400 group-hover:text-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                        />
                    </svg>
                    {wishListCount > 0 && (
                        <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                            {wishListCount}
                        </span>
                    )}
                </div>
            </Link>

            {/* 장바구니 */}
            <Link
                href="/cart"
                onClick={closeMenu}
                className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50 group"
            >
                <span className="text-gray-700 font-medium group-hover:text-black">Cart</span>
                <div className="relative text-gray-400 group-hover:text-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                            {cartCount}
                        </span>
                    )}
                </div>
            </Link>

            {/* 마이페이지 */}
            <Link
                href="/mypage"
                onClick={closeMenu}
                className="flex items-center justify-between px-6 py-5 border-b border-gray-100 hover:bg-gray-50 group"
            >
                <span className="text-gray-700 font-medium group-hover:text-black">My Page</span>
                <div className="text-gray-400 group-hover:text-black">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>
            </Link>
        </div>
    );
}
