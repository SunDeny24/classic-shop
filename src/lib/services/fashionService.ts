// src/lib/services/fashionService.ts

import { httpGet } from "../http";
import { FashionResponse } from "@/types/fashion";

/**
 * 네이버쇼핑 데이터를 가져오는 서비스 함수
 * @param query - 검색어
 * @param pageParam - 페이지번호 (TanStack Query에서 전달)
 */
export async function fetchFashionProducts(
  query: string,
  pageParam: number = 1, //Tanstack query에 넘겨줄 페이지번호
) {
  const display = 20;
  // 20개씩 보여주고 싶다면, 1페이지는 1~20, 2페이지는 21~40, 3페이지는 41~60 이런식으로 start값이 변해야함
  // 공식 : (페이지번호)-1 * 한페이지당 갯수(display) + 1
  const start = (pageParam - 1) * display + 1;

  const params = new URLSearchParams({
    query,
    display: display.toString(), //url 쿼리스트링으로 넘겨줄 때는 문자열로 변환해야함
    start: start.toString(),
    sort: "sim", //기본값 정확도순
  });

  return httpGet<FashionResponse>(`/api/naver-fashion?${params.toString()}`);
}
