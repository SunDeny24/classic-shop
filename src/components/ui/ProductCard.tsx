//상품 카드 컴포넌트
// src/components/ui/ProductCard.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LikeButton from "./LikeButton";
import { ProductStorageData } from "@/types/fashion";

interface ProductCardProps {
  productData: ProductStorageData;
}

export default function ProductCard({ productData }: ProductCardProps) {
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
          {!isImageLoaded && (
            <div className="absolute inset-0 z-10 animate-pulse bg-zinc-200" />
          )}
          <Image
            src={productData.image}
            alt={productData.title}
            fill
            sizes="300px" //sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,33vw"
            className={`object-cover transition-all duration-500 ${
              isImageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } group-hover:scale-105`}
            onLoad={() => setIsImageLoaded(true)}
            quality={60}
          />
          <LikeButton productData={productData} />
        </div>
        <div className="py-5 px-1">
          <p className="text-[12px]  sm:text-[12px] font-semibold text-gray-600 mb-1">
            {productData.brand}
          </p>
          <h3 className="text-[12px] sm:text-[14px] font-normal text-gray-900 ">
            {productData.title}
          </h3>
          <p className="text-lg sm:text-xl font-semibold text-gray-950 mt-1">
            {productData.lprice}
          </p>
        </div>
      </Link>
    </div>
  );
}
