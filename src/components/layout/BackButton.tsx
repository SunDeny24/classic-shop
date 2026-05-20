// 이전 버튼

'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.back()} // 브라우저의 '뒤로 가기'와 동일하게 동작
            className="cursor-pointer flex items-center text-gray-600 hover:text-black transition-colors"
        >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>뒤로가기</span>
        </button>
    );
}
