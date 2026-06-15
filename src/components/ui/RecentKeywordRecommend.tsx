"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCardGrid from "./ProductCardGrid";
import { CuratedProduct } from "@/types/fashion";

interface RecentKeywordRecommendProps {
  keyword: string;
  products: CuratedProduct[];
  loading: boolean;
}

export default function RecentKeywordRecommend({
  keyword,
  products,
  loading,
}: RecentKeywordRecommendProps) {
  const [randomProducts, setRandomProducts] = useState<CuratedProduct[]>([]);
  const gridClass =
    "grid grid-" + "cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10";

  useEffect(() => {
    if (!products || products.length === 0) {
      queueMicrotask(() => setRandomProducts([]));
      return;
    }
    // 되섞임 방지 : products가 바뀔 때마다 무작위로 섞어서 6개만 보여주는데,
    // 이미 섞인 추천 상품이 존재한다면, TanStack Query가 뒤에서
    // 최신 데이터를 재요청해서 products의 참조가 바뀌더라도 다시 섞지 않고 락(Lock) 걸기
    if (randomProducts.length > 0) return;

    const shuffled = [...products].sort(() => Math.random() - 0.5);
    queueMicrotask(() => setRandomProducts(shuffled.slice(0, 6)));
  }, [products]);

  // 최근 검색어 없는 경우
  if (!keyword || (!loading && products.length === 0)) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex flex-col gap-1 ">
          <h3 className="text-lg sm:text-xl font-medium text-zinc-800">
            <span className="text-xl sm:text-2xl font-bold text-blue-700 px-2 py-1 ">
              # {keyword}
            </span>
            관련 추천 상품
          </h3>
        </div>
        {/* 조건: 로딩 중이 아니고, 데이터가 4개를 초과할 때만 '더보기' 노출 */}
        {!loading && products.length > 6 && (
          <Link
            href={`/search/${encodeURIComponent(keyword)}`}
            className="group flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-600 text-xs font-medium text-white hover:bg-blue-700 transition-all duration-200"
          >
            더보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        )}
      </div>
      {loading ? (
        //로딩중이면 스켈레톤만 보여줌
        <ProductCardGrid
          gridClass={gridClass}
          productInfo={[]}
          isLoading={true}
          skeletonCount={4}
        />
      ) : products.length > 0 ? (
        <ProductCardGrid
          gridClass={gridClass}
          productInfo={randomProducts}
          isLoading={false}
        />
      ) : (
        /* 로딩이 끝났는데 데이터가 0개인 경우 */
        <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-2xl">
          <p className="text-zinc-600 font-light italic">
            &quot;{keyword}&quot; 에 대한 추천 상품 데이터가 충분하지 않습니다.
          </p>
          <p className="text-xs text-zinc-500 mt-2">
            다른 키워드로 검색하여 관련된 추천 상품을 확인해보세요.
          </p>
        </div>
      )}
    </div>
  );
}
