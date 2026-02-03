//상품 카드 컴포넌트
// src/components/ui/ProductCard.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import LikeButton from './LikeButton';

export default function ProductCard({ productData }) {
    //이미지 로딩위한 상태관리
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="overflow-hidden group">
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
                    <LikeButton productData={productData} />
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
