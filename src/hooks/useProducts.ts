// 네이버 상품목록 조회 커스텀 훅
// src/hooks/useProducts.ts
// - useInfiniteQuery로 "product" 데이터 가져오기
// - processNaverData 통해 가공된 데이터 curatedItems로 추가
// - 정렬로직 (curatedItems 평탄화, 중복제거, 최저가·최고가 비교)

"use client";

import { useState, useMemo } from "react";
import { fetchFashionProducts } from "@/lib/services/fashionService";
import processNaverData from "@/utils/processNaverData";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useProducts(query: string) {
  //정렬 state
  const [sortType, setSortType] = useState<"default" | "low" | "high">(
    "default",
  );
  const {
    data, //전체데이터
    fetchNextPage, //다음페이지 가져오는 함수
    hasNextPage, //다음 페이지가 있는지 여부 확인
    isFetchingNextPage, //다음 페이지 추가로 불러오는 중인지
    isLoading, //처음 로딩중인지
    isError, //에러났는지
    error, //에러객체
    refetch, //재요청 함수
  } = useInfiniteQuery({
    queryKey: ["products", query], //요청의 고유 키 - query가 바뀌면 새로운 데이터 요청
    //실제 데이터 가져오는 함수
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchFashionProducts(query, pageParam);
      return {
        ...response,
        curatedItems: processNaverData(response.items ?? [], query), //가공데이터 추가
        originalCount: response.items?.length ?? 0, //원본데이터 갯수 추가 - 필터안된 데이터 갯수로 다음페이지 여부 판단하기 위함
      };
    },
    initialPageParam: 1, //첫요청 페이지 1
    // query가 비어있으면 API 호출 자체를 차단 (네이버 API는 빈 query로 400 반환)
    enabled: !!query.trim(),
    //다음 페이지번호결정하는 함수(필수)
    getNextPageParam: (lastPage, allPages) => {
      const DISPLAY_COUNT = 20; //한페이지당 보여줄 갯수
      const hasMore = lastPage.originalCount === DISPLAY_COUNT; //원본데이터 갯수가 한페이지당 보여줄 갯수와 같다면 다음페이지 존재
      return hasMore ? allPages.length + 1 : undefined; //다음 페이지번호는 현재까지 불러온 페이지 수 + 1, 다음 페이지 없으면 undefined 반환
    },
  });

  //정렬 로직(가격순)
  const products = useMemo(() => {
    if (!data) return [];

    //모든 페이지를 돌며 가공된 상품데이터만 뽑아서 하나의 배열로 합치기
    const allItems = data.pages.flatMap((page) => page.curatedItems);

    //중복제거
    const uniqueMap = new Map();
    allItems.forEach((item) => {
      if (!uniqueMap.has(item.productId)) {
        uniqueMap.set(item.productId, item);
      }
    });
    const uniqueProducts = Array.from(uniqueMap.values());

    const sorted = [...uniqueProducts];
    // 최저가 최고가 비교
    if (sortType === "low") {
      sorted.sort((a, b) => a.rawPrice - b.rawPrice);
    }
    if (sortType === "high") {
      sorted.sort((a, b) => b.rawPrice - a.rawPrice);
    }
    return sorted;
  }, [data, sortType]);

  return {
    products, //가공된 상품리스트
    loading: isLoading, //처음 로딩중인지
    error: isError ? (error as Error).message : null,
    sortType,
    setSortType,
    refetch,
    loadMore: fetchNextPage, //다음 페이지 가져오는 함수
    hasNextPage, // 더 가져올 데이터 있는지 여부
    isFetchingNextPage, // 추가 데이터를 가져오는 중인지 알려주는 상태
  };
}
