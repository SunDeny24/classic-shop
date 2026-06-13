// 추천섹션 wrapper
// src/components/ui/RecommendSection.jsx

"use client";

import RecentKeywordRecommend from "@/components/ui/RecentKeywordRecommend";
import RecommendedVideos from "@/components/ui/RecommendVideo";
import { useState, useMemo, useEffect } from "react";
import { useYoutube } from "@/hooks/useYoutube";
import { useProducts } from "@/hooks/useProducts";
import { isStringArray } from "@/utils/typeGuards";

export default function RecommendSection() {
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
  const [msgIndex, setMsgIndex] = useState(0); // 검색어, 트렌드영상 없을 경우 멘트 상태관리

  // 랜덤 멘트 리스트
  const messages = useMemo(
    () => [
      "편하게! 빠르게! 선택할 수 있는 쇼핑몰 Skipick 입니다.",
      "찾으시는 상품 검색시 관련된 추천영상과 추천템을 보여드려요.",
      "상품 검색시 카테고리와 디테일 옵션을 활용해보세요!",
      "최근 본 상품은 홈화면 하단 리스트에서 언제든 다시 확인할 수 있습니다.",
      "마음에 드는 상품은 하트를 눌러 위시리스트에 담아보세요.",
      "Skipick은 당신의 스마트하고 즐거운 쇼핑 경험을 함께합니다.",
    ],
    [],
  );
  useEffect(() => {
    // 로컬스토리지에서 키워드 가져오기
    const savedSearches = localStorage.getItem("recent_searches");
    let selectedKeyword = "";
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        if (isStringArray(parsed) && parsed.length > 0) {
          selectedKeyword = parsed[0];
        }
      } catch {
        // ignore
      }
    }
    queueMicrotask(() => setKeyword(selectedKeyword));

    // 7초마다 멘트 인덱스 변경
    const interval = setInterval(() => {
      queueMicrotask(() => setMsgIndex((prev) => (prev + 1) % messages.length)); //배열만큼 인터벌 돌려줌
    }, 7000);
    return () => clearInterval(interval); //인터벌 초기화
  }, [messages.length]);

  // 유튜브 데이터 조회 (상태 끌어올리기)
  const type = keyword ? "search" : "trend";
  const {
    data: videos = [],
    isLoading: isYoutubeLoading,
    isError: isYoutubeError,
    error,
  } = useYoutube(type, keyword);
  // 네이버 상품 데이터 조회 (상태 끌어올리기) - 이중 fetch 방지 위해 키워드 조회해서 있을 때만 조회하도록 수정함
  const { products = [], loading: isProductLoading } = useProducts(keyword);

  // 영상 유무 판단 (상태 변수 대신 계산된 변수 사용)
  const hasVideos = !isYoutubeLoading && !isYoutubeError && videos.length > 0;
  const hasProducts = !isProductLoading && products.length > 0;

  // 26.06.13 검색결과 0인 경우 null로 인해
  // [ㄴ안녀ㅇ 등 예외 케이스 방어]: 불완전한 한글 단어 검색 등으로 결과 데이터가 0개(null)가 떨어져
  // 하위 컴포넌트(RecentKeywordRecommend)가 null을 리턴하여 화면에서 증발하더라도, 부모(RecommendSection) 이 상태를 통제하여 가이드 메시지 노출함
  // 관련 검색된 상품, 추천 영상도 없을 때 멘트 노출
  const showMessage =
    !hasVideos && !hasProducts && !isYoutubeLoading && !isProductLoading;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 space-y-5">
        {/* 추천 상품 컴포넌트 - 상단에서 호스팅한 데이터를 Props로 바인딩하여 불필요한 네트워크 중복 비용 제거  */}
        <RecentKeywordRecommend
          keyword={keyword}
          products={products}
          loading={isProductLoading}
        />
        {/* 추천 영상 컴포넌트: 영상이 없으면 내부에서 null을 반환하도록 설정 */}
        <RecommendedVideos
          videos={videos}
          loading={isYoutubeLoading}
          error={error}
          keyword={keyword}
        />

        {/* 검색어 혹은 결과 데이터(상품/영상)가 모두 존재하지 않을 때만 가이드 멘트 노출  */}
        {showMessage && (
          <div className="w-full text-center my-3 overflow-hidden ">
            <p
              key={msgIndex}
              className="text-zinc-500 text-2xl font-medium animate-msg-reveal px-6 transition-all"
            >
              &quot;{messages[msgIndex]}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
