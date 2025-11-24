//Header 컴포넌트 구성
'use client';
import { useState } from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import SearchModal from '../ui/SearchModal';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); //햄버거메뉴오픈
    const [isSearchOpen, setIsSearchOpen] = useState(false); //검색모달 오픈
    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <UserMenu />
                    {/* 모바일에서 보이는 햄버거메뉴 버튼*/}
                    <button
                        className="md:hidden text-gray-600 hover:text-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen) /* 메뉴오픈으로 상태값변경*/}
                    >
                        {isMenuOpen ? (
                            <svg
                                id="x-icon"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        ) : (
                            <svg
                                id="menu-icon"
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        )}
                    </button>
                </div>
                <div className="hidden md:flex justify-between items-center h-12">
                    <Navigation />
                    <SearchBar open={isSearchOpen} setOpen={setIsSearchOpen} />
                </div>
                {/* 검색창 클릭시 검색모달 오픈*/}
                {isSearchOpen ? <SearchModal closeSearch={() => setIsSearchOpen(false)} /> : ''}
                <MobileMenu open={isMenuOpen} setOpen={setIsMenuOpen} />
            </div>
        </div>
    );
}
