// src/types/fashion.ts

export interface FashionProduct {
  productId: string;
  title: string;
  link: string;
  image: string;
  lprice: string; // "15500" (문자열로 옴)
  hprice: string;
  mallName: string;
  brand: string;
  productType: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

export interface FashionResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: FashionProduct[];
}

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

//로컬스토리지 필요한 정보만 담은 포맷 타입
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
