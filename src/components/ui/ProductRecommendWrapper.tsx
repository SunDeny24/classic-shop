// 서버 컴포넌트에서 클라이언트 컴포넌트로 변경하여, TanStack Query 훅을 사용할 수 있도록 합니다.

"use client";

import { useProducts } from "@/hooks/useProducts";
import RecentKeywordRecommend from "@/components/ui/RecentKeywordRecommend";
import { useState } from "react";
import { isStringArray } from "@/utils/typeGuards";

export default function ProductRecommendWrapper() {
  const [keyword, setKeyword] = useState<string>(() => {
    // 키워드 초기화
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recent_searches");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (isStringArray(parsed) && parsed.length > 0) {
            return parsed[0];
          }
        } catch {
          // ignore
        }
      }
    }
    return "";
  });
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
