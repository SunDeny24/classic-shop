//상품 카드 컴포넌트
// src/components/ui/ProductCard.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProductCard({ productData }) {
    //이미지 로딩위한 상태관리
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="bg-white overflow-hidden group">
            <Link
                href={{
                    pathname: `/product/${productData.productId}`,
                    query: {
                        data: encodeURIComponent(JSON.stringify(productData)),
                    },
                }}
            >
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50">
                    {!isImageLoaded && <div className="absolute inset-0 z-10 animate-pulse bg-zinc-200" />}
                    <img
                        src={productData.image}
                        alt={productData.title}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                            isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        } group-hover:scale-105`}
                        onLoad={() => setIsImageLoaded(true)}
                    />
                    <button data-like-button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <svg
                            className="w-5 h-5 text-gray-500"
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
                <div className="pt-5 pb-8 px-1">
                    <p className="text-[12px] font-semibold text-gray-600 mb-1">{productData.brand}</p>
                    <h3 className="text-[15px] font-normal text-gray-900 ">{productData.title}</h3>
                    <p className="text-xl font-semibold text-gray-950 mt-1">{productData.lprice}</p>
                </div>
            </Link>
        </div>
    );
}
