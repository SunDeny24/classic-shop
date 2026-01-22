// 좋아요 버튼 컴포넌트
'use client';

import { useEffect, useState } from 'react';

export default function LikeButton({ productData }) {
    const [isLiked, setIsLiked] = useState(false);
    //console.log(productData);

    //해당 상품ID가 로컬스토리지 ID와 맞는지 확인
    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem('wishList')) || [];
        // 해당 상품ID가 맞으면 TRUE 아니면 FALSE 토글처리
        const isSavedLiked = savedLikes.some((item) => item.productId === productData.productId);
        setIsLiked(isSavedLiked);
    }, [productData.productId]);

    const toggleLike = (e) => {
        e.preventDefault(); // 링크 이동 방지 (부모가 Link일 경우)
        e.stopPropagation(); // 부모 요소(카드 링크) 클릭 방지
        console.log('클릭');
        const savedLikes = JSON.parse(localStorage.getItem('wishList')) || [];

        let updatedLikes;
        if (isLiked) {
            updatedLikes = savedLikes.filter((item) => item.productId === productData.productId);
        } else {
            updatedLikes = [...savedLikes, productData];
        }
        localStorage.setItem('wishList', JSON.stringify(updatedLikes));
        setIsLiked(!isLiked);
    };

    return (
        <div>
            <button onClick={toggleLike} className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                <svg
                    className={`w-5 h-5 transition-colors ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
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
            </button>
        </div>
    );
}
