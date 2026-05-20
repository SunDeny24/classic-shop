// src/types/fashion.ts

/** 네이버 쇼핑 API 에서 반환되는 원본 데이터 구조 */
export interface FashionProduct {
  productId: string;
  title: string;
  link: string; //상품의 url 링크
  image: string;
  lprice: string; // 최저가 "15500" (문자열로 옴)
  hprice: string; // 최고가
  mallName: string; //쇼핑몰명
  brand: string;
  productType: string; // 카테고리(예: "패션의류")
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

/** 네이버 쇼핑 API의 응답구조 */
export interface FashionResponse {
  lastBuildDate: string; // 응답 생성시간
  total: number; // 검색결과 총갯수
  start: number; // 검색결과 시작위치(1부터 시작)
  display: number; //응답에 포함된 갯수(기본값 : 20으로 지정)
  items: FashionProduct[]; // 상품 배열
}

/** 클라이언트 사용위한 가공된 상품 정보 (FashionProduct를 변환한 타입) */
export interface CuratedProduct {
  productId: string;
  title: string; // <b> 태그가 제거된 깨끗한 제목
  image: string;
  brand: string; // brand가 없으면 mallName으로 대체된 값
  link: string;
  lprice: string; // formatPrice()를 거친 포맷팅된 가격 (예: "15,500")
  rawPrice: number; // parseInt()를 거친 숫자형 가격 (정렬/비교용)
  productType: string;
  mallName: string;
  keyword: string; // 검색어 정보 유지
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

/*
 * 사용자의 최근 본 상품 데이터(로컬스토리지 저장용)
 *  CuratedProduct에서 필요한 필드만 구성함
 */
export interface RecentViewData extends Pick<
  CuratedProduct,
  | "productId"
  | "brand"
  | "title"
  | "image"
  | "lprice"
  | "link"
  | "rawPrice"
  | "keyword"
> {}

/**
 * ProductCard용 데이터
 * */
export interface ProductCardData {
  productId: string;
  title: string;
  image: string;
  brand: string;
  link: string;
  lprice: string;
  rawPrice: number;
  keyword: string;
}
