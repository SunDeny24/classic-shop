//스크롤 위로 가는 버튼 컴포넌트

'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisble, setIsvisble] = useState(false);

    //스크롤 300이상일때 버튼보여줌
    useEffect(() => {
        const toggleVisible = () => {
            if (window.scrollY > 300) setIsvisble(true);
            else setIsvisble(false);
        };

        window.addEventListener('scroll', toggleVisible);

        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisble) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-3 bg-white border border-gray-200 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 text-gray-700"
            aria-label="맨 위로 이동"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}
