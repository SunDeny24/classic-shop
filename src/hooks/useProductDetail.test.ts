// useProductsDetail.ts 테스트
// - 예외처리 : productId 없거나 일치하지않으면 null 반환
// - 1순위 : Tanstack query에 캐시에 있으면 상품데이터 반환
// - 2순위 : zustand 장바구니 스토어에 있으면 데이터 반환
// - 3순위 : zustand 위시리스트 스토어에 있으면 데이터 반환
// - 4순위 : 로컬스토리지에 있으면 데이터 반환

import { describe, it, expect, vi, beforeEach } from "vitest";
// 훅이 외부 API 호출을 직접 하지 않으므로 쿼리 클라이언트 래퍼 대신 기본 renderHook 사용
import { renderHook } from "@testing-library/react";
import { useProductDetail } from "./useProductDetail";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useShoppingStore, type ShoppingStore } from "@/store/useShoppingStore";
import {
  createMockCuratedProduct,
  createMockShoppingStore,
} from "@/test/mockFactory";

// Tanstack query 모킹 : useQueryClient로 가짜 캐시 반환설정
vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return { ...actual, useQueryClient: vi.fn() };
});
// queryclient 생성
const queryClient = new QueryClient();
// getQueriesData를 감시(Spy)
const getQueriesDataSpy = vi.spyOn(queryClient, "getQueriesData");

// zustand 모킹 : 장바구니, 위시리스트 조작할수있게 설정
vi.mock("@/store/useShoppingStore", () => ({
  useShoppingStore: vi.fn(),
}));
//가짜상태값 조작할수있게 하는 헬퍼함수
const mockShoppingStore = (state: ShoppingStore) => {
  vi.mocked(useShoppingStore).mockImplementation(
    <T>(selector: (state: ShoppingStore) => T): T => selector(state),
  );
};

describe("useProductDetail훅 테스트", () => {
  //공통 clear 설정
  beforeEach(() => {
    vi.clearAllMocks(); //함수 호출 기록 지우기
    localStorage.clear(); // 로컬스토리지 지우기

    // 기본 캐시 설정
    vi.mocked(useQueryClient).mockReturnValue(queryClient); // useQueryClient()가 항상 위에서 만든 queryClient를 반환
    getQueriesDataSpy.mockReturnValue([]); //기본 캐시는 비어있는 상태로 설정

    // 기본 스토어 설정 : 스토어 함수모킹
    mockShoppingStore(createMockShoppingStore());
  });

  it("productId가 비었거나, 모든곳에 데이터가 없으면 null을 반환 해야된다.", () => {
    // productId 없이 렌더링
    const { result } = renderHook(() => useProductDetail(""));
    expect(result.current.product).toBeNull(); //아무것도 없을땐 null을 반환
  });

  it("[1순위] React Query 캐시(['products'])에 상품이 있으면 가장 먼저 반환한다", () => {
    const targetProduct = createMockCuratedProduct({
      productId: "1",
      title: "캐시상품",
    });

    // getQueriesDataSpy로 가짜 캐시 반환
    getQueriesDataSpy.mockReturnValue([
      [
        ["products"],
        {
          pages: [
            {
              curatedItems: [targetProduct],
            },
          ],
        },
      ],
    ]);

    //productId = "1"로 훅 실행
    const { result } = renderHook(() => useProductDetail("1"));

    // 캐시 product에 상품이 있으면 바로 가져옴
    expect(result.current.product?.title).toBe("캐시상품");
  });

  it("[2순위] 캐시에 없고 장바구니 스토어에 있으면 장바구니스토어(cart)에 있는 데이터를 반환한다.", () => {
    const targetProduct = createMockCuratedProduct({
      productId: "2",
      title: "장바구니상품",
    });

    //zustand스토어 모킹 :장바구니 데이터있고 위시리스트 데이터없음으로 설정
    mockShoppingStore(
      createMockShoppingStore({
        cart: [{ ...targetProduct, quantity: 1 }],
      }),
    );

    const { result } = renderHook(() => useProductDetail("2"));

    // 1순위 캐시에 없고 2순위 장바구니 스토어에 데이터 있으면 장바구니 상품 가져온다.
    expect(result.current.product?.title).toBe("장바구니상품");
  });

  it("[3순위] 캐시와 장바구니에 없고 위시리스트(wishList)에 있으면 위시리스트 스토어 데이터를 반환한다", () => {
    const targetProduct = createMockCuratedProduct({
      productId: "3",
      title: "위시리스트상품",
    });

    //useShoppingStore실행시 wishList에 데이터 있는 함수로 모킹
    mockShoppingStore(
      createMockShoppingStore({
        wishList: [targetProduct],
      }),
    );

    const { result } = renderHook(() => useProductDetail("3"));
    expect(result.current.product?.title).toBe("위시리스트상품");
  });

  it("[4순위] 메모리(캐시, 스토어)에 모두 없으면 로컬 스토리지 최근본상품(recent_products)에서 찾아 반환한다", () => {
    const targetProduct = createMockCuratedProduct({
      productId: "4",
      title: "로컬스토리지상품",
    });

    // 로컬 스토리지에 문자열(JSON) 형태로 직접 최근 본 상품을 심어둠 - 로컬스토리지에 데이터가 있는 상태
    localStorage.setItem("recent_products", JSON.stringify([targetProduct]));

    // ID "4"로 훅 실행 (캐시와 스토어는 이미 비어있는 상태)
    const { result } = renderHook(() => useProductDetail("4"));

    // 메모리 저장소를 모두 거치고 마지막 4순위인 로컬 스토리지에서 찾아야 함
    expect(result.current.product?.title).toBe("로컬스토리지상품");
  });
});
