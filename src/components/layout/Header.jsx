//Header 컴포넌트 구성
'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import MobileMenu from './MobileMenu';
import SearchModal from '@/components/ui/SearchModal';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false); //햄버거메뉴오픈
    const [isSearchOpen, setIsSearchOpen] = useState(false); //검색모달 오픈
    const pathName = usePathname();

    //경로 변경시 모달 강제닫기
    useEffect(() => {
        if (isSearchOpen) {
            setIsSearchOpen(false);
        }
    }, [pathName]);

    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20 gap-8">
                    <Logo />
                    <div className="hidden md:flex flex-1 max-w-xl relative group">
                        <SearchBar open={isSearchOpen} setOpen={setIsSearchOpen} />
                    </div>
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
                {/* 검색창 클릭시 검색모달 오픈*/}
                {isSearchOpen ? <SearchModal closeSearch={() => setIsSearchOpen(false)} /> : ''}
                <MobileMenu open={isMenuOpen} setOpen={setIsMenuOpen} />
            </div>
        </div>
    );
}
