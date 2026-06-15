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
  return (
    <div className="overflow-hidden group">
      <Link
        href={{
          pathname: `/product/${productData.productId}`,
        }}
      >
        {/* 배경 */}
        <div className="relative aspect-[3/4] overflow-hidden bg-zinc-50">
          <Image
            src={productData.image}
            alt={productData.title}
            fill
            sizes="300px"
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            quality={60}
          />
          <LikeButton productData={productData} />
        </div>
        <div className="py-5 px-1">
          <p className="text-[12px]  sm:text-[12px] font-semibold text-gray-600 mb-1">
            {productData.brand}
          </p>
          <h3 className="text-[12px] sm:text-[14px] font-normal text-gray-900 min-h-[40px] ">
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
