// src/utils/typeGuards.ts
// JSON.parse 결과의 런타임 타입 안전성을 보장하는 타입 가드 함수들
// - as 타입 단언은 컴파일 타임에만 동작하므로, 변조된 localStorage 데이터에는 무력함
// - 타입 가드는 런타임에 실제 객체 구조를 검사하여 타입 안전성을 실질적으로 보장

import { ProductStorageData, CuratedProduct } from "@/types/fashion";

/**
 * 1. 단일 객체가 CuratedProduct 구조에 완벽히 부합하는지 런타임에 검사하는 타입 가드
 * @param item - 구조를 알 수 없는 미지의 데이터 (unknown)
 * @returns item의 구조가 CuratedProduct 규칙을 모두 만족하면 true, 아니면 false
 */
export function isCuratedProduct(item: unknown): item is CuratedProduct {
  // 데이터 null, undefined거나 객체 형태 아니면 탈락
  if (!item || typeof item !== "object") return false;
  // 일시적인 타입단언 적용: 런타임 검증을 위해 객체로 간주하되, 실제 구조는 아래에서 엄격히 검사
  const obj = item as Record<string, unknown>;

  return (
    typeof obj.productId === "string" &&
    typeof obj.title === "string" &&
    typeof obj.image === "string" &&
    typeof obj.brand === "string" &&
    typeof obj.link === "string" &&
    typeof obj.rawPrice === "number" &&
    typeof obj.lprice === "string" &&
    typeof obj.productType === "string" &&
    typeof obj.mallName === "string" &&
    typeof obj.keyword === "string" &&
    typeof obj.category1 === "string" &&
    typeof obj.category2 === "string" &&
    typeof obj.category3 === "string" &&
    typeof obj.category4 === "string"
  );
}

/**
 * 2. 최근 검색어 목록 등 단순 문자열 배열(string[]) 여부를 런타임에 검증하는 타입 가드
 * @param value - 구조를 검증할 대상
 */
export function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

/**
 * 3. 단일 객체가 최근 본 상품 포맷(RecentViewData) 구조에 부합하는지 검사하는 내부 헬퍼 함수
 * - 파일 외부로 내보내지 않고(export 생략) 아래의 4번 함수인 '배열 검증기'에서 내부 순회용으로만 사용합니다.
 */
function isRecentViewData(item: unknown): item is ProductStorageData {
  // 객체 형태가 아니면 탈락
  if (!item || typeof item !== "object") return false;
  const obj = item as Record<string, unknown>;

  // RecentViewData의 필수 필드 7개가 정상 타입인지 확인합니다.
  return (
    typeof obj.productId === "string" &&
    typeof obj.title === "string" &&
    typeof obj.image === "string" &&
    typeof obj.brand === "string" &&
    typeof obj.link === "string" &&
    typeof obj.rawPrice === "number" &&
    typeof obj.lprice === "string" &&
    // keyword는 선택적이고 undefined, null, 또는 string이 허용됩니다.
    (obj.keyword === undefined ||
      obj.keyword === null ||
      typeof obj.keyword === "string")
  );
}

/**
 * 4. 실질적으로 최근 본 상품 리스트 전체(RecentViewData[])가 유효한지 검증하는 전역 타입 가드
 * @param value - localStorage에서 꺼내와 JSON.parse를 마친 임의의 데이터
 */
export function isRecentViewDataArray(
  value: unknown,
): value is ProductStorageData[] {
  return Array.isArray(value) && value.every(isRecentViewData);
}
