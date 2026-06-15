// 서버 컴포넌트에서 클라이언트 컴포넌트로 변경하여, TanStack Query 훅을 사용할 수 있도록 합니다.

"use client";

import { useProducts } from "@/hooks/useProducts";
import RecentKeywordRecommend from "@/components/ui/RecentKeywordRecommend";
import { useState, useEffect } from "react";
import { isStringArray } from "@/utils/typeGuards";

export default function ProductRecommendWrapper() {
  // 초기값 "" 고정 → 서버/클라이언트 초기 렌더 일치 (Hydration Mismatch 방지)
  // localStorage 읽기는 useEffect에서만 수행
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isStringArray(parsed) && parsed.length > 0) {
          queueMicrotask(() => setKeyword(parsed[0]));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  // TanStack Query가 내장된 훅에서 데이터를 안전하게 가져옵니다.
  const { products = [], loading: isProductLoading } = useProducts(keyword);

  return (
    <RecentKeywordRecommend
      keyword={keyword}
      products={products}
      loading={isProductLoading}
    />
  );
}
