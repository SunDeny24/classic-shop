// src/hooks/useProductDetail.ts
//상품 상세 정보 훅

"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { CuratedProduct, ProductStorageData } from "@/types/fashion";
import { isRecentViewDataArray } from "@/utils/typeGuards";
import { useShoppingStore } from "@/store/useShoppingStore";

export function useProductDetail(productId: string) {
  const queryClient = useQueryClient();

  const cart = useShoppingStore((state) => state.cart);
  const wishList = useShoppingStore((state) => state.wishList);

  const product = useMemo((): ProductStorageData | null => {
    if (!productId) return null;

    /* 1. Tanstack query 캐시 전수 조사  */
    const cached =
      queryClient.getQueriesData<{
        pages: { curatedItems: CuratedProduct[] }[]; //무한스크롤 페이지 데이터 배열
        pageParams: any[]; //페이지네이션을 위한 파라미터 배열
      }>({ queryKey: ["products"] }) || [];

    for (const [, queryCacheData] of cached) {
      if (!queryCacheData || !queryCacheData.pages) continue; //데이터, 무한스크롤의 pages 없으면 스킵

      //무한스크롤 페이지안에 모든 데이터 평탄화해서 모든 상품 아이템 조회(배열화)
      const allItems = queryCacheData.pages.flatMap(
        (page) => page.curatedItems || [],
      );
      // 평탄화된 상품 아이템 중 productId 일치하는것만 찾기
      const found = allItems.find(
        (item) => String(item.productId) === String(productId),
      );

      if (found) return found; //구조적 타이핑으로 RecentViewData와 CuratedProduct는 호환되므로 바로 반환됨
    }

    /* 2. 장바구니 캐시 조회 */
    const foundInCart = cart.find(
      (item) => String(item.productId) === String(productId),
    );
    if (foundInCart) return foundInCart;

    /* 3. 위시리스트 캐시 조회  */
    const foundInWishList = wishList.find(
      (item) => String(item.productId) === String(productId),
    );
    if (foundInWishList) return foundInWishList;

    // 4. 로컬 스토리지 "recent_products"에서 fallback
    // (외부 URL 직접 접근, 새탭 열기, 새로고침 등 캐시 없는 경우)
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recent_products"); //최근 본 상품 배열
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (isRecentViewDataArray(parsed)) {
            const found = parsed.find((item) => item.productId === productId);
            if (found) return found; //id 일치하는 상품 반환
          }
        } catch {
          // ignore
        }
      }
    }
    return null;
  }, [productId, queryClient, cart, wishList]);

  return { product };
}
