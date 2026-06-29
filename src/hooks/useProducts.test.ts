// useProducts.ts 테스트
// - API가 준 데이터 잘 평탄화되는지 확인
// - 중복된 데이터 잘 제거 됐는지 확인
// - 정렬이 잘 되는지 확인

import { renderHookWithQuery } from "@/test/test-utils";
import { useProducts } from "./useProducts";
import * as fashionService from "@/lib/services/fashionService"; //모킹을 위해 전체 가져오기
import { vi, describe, it, expect, beforeEach } from "vitest";
import processNaverData from "@/utils/processNaverData";
import { FashionResponse } from "@/types/fashion";
import { waitFor, act } from "@testing-library/react";
import { createMockCuratedProduct } from "@/test/mockFactory";

// service, processNaverData 모킹
vi.mock("@/lib/services/fashionService");
vi.mock("@/utils/processNaverData"); // processNaverData는 따로 유닛테스트

// 기본응답
const mockApiResponse: FashionResponse = {
  lastBuildDate: "2026-06-29",
  total: 0,
  start: 1,
  display: 20,
  items: Array(20).fill({ productId: "1" }),
};

describe("useProducts훅 테스트", () => {
  // 테스트시 응답 및 호출이력 초기화
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("API 데이터를 받아 모든 페이지를 평탄화하여 합친다", async () => {
    // 서비스 모킹 : API 호출시 가짜 응답데이터 반환하도록 설정
    // items 추가 : getNextPageParam에 페이지가 20개여야만 다음페이지를 부르는 로직이 있음
    vi.mocked(fashionService.fetchFashionProducts).mockResolvedValue({
      ...mockApiResponse,
      items: Array(20).fill({ productId: "dummy" }) as any,
    });

    //processNaverData 함수가 반환시 각 한번에 한번씩 반환하게 설정
    vi.mocked(processNaverData)
      .mockReturnValueOnce([createMockCuratedProduct({ productId: "1" })])
      .mockReturnValueOnce([createMockCuratedProduct({ productId: "2" })]);

    // 훅 렌더링
    const { result } = renderHookWithQuery(() => useProducts("운동화"));
    // 데이터 로딩시 비동기로 false될때까지 대기
    await waitFor(() => expect(result.current.loading).toBe(false));

    // 다음페이지 불러오기 실행(상태변화가 있으므로 act)
    act(() => {
      result.current.loadMore();
    });
    // 다음페이지 데이터 들어올때까지 비동기로 대기
    await waitFor(() => expect(result.current.isFetchingNextPage).toBe(false));

    // 단언 : 평탄화되어 배열의 길이가 2인지(2페이지) 확인
    expect(result.current.products).toHaveLength(2);
  });

  it("중복된 productId를 가진 데이터는 제거되어야 한다", async () => {
    // 서비스 모킹
    vi.mocked(fashionService.fetchFashionProducts).mockResolvedValue(
      mockApiResponse,
    );

    // 데이터 모킹 : 데이터 가공 함수가 productId가 같은 상품을 2개 반환하게 설정 - 중복제거위해
    vi.mocked(processNaverData).mockReturnValue([
      createMockCuratedProduct({ productId: "1" }),
      createMockCuratedProduct({ productId: "1" }),
    ]);

    //훅 렌더링
    const { result } = renderHookWithQuery(() => useProducts("운동화"));
    // 비동기로 로딩 기다려주기
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // 단언 : 중복제거되어 1개인지 확인
    expect(result.current.products).toHaveLength(1);
  });

  it("sortType 변경 시 가격순 정렬이 되어야 한다.", async () => {
    // 서비스 모킹
    vi.mocked(fashionService.fetchFashionProducts).mockResolvedValue(
      mockApiResponse,
    );

    //가격이 다른 상품 두개 반환하도록 설정
    vi.mocked(processNaverData).mockReturnValue([
      createMockCuratedProduct({ productId: "1", rawPrice: 5000 }),
      createMockCuratedProduct({ productId: "2", rawPrice: 1000 }),
    ]);

    const { result } = renderHookWithQuery(() => useProducts("운동화"));
    await waitFor(() => expect(result.current.loading).toBe(false));

    // 상태변경(정렬변경) act 사용
    act(() => {
      result.current.setSortType("low");
    });
    // 최저가가 먼저 왔는지 확인(1000)
    expect(result.current.products[0].rawPrice).toBe(1000);
    expect(result.current.products[1].rawPrice).toBe(5000);

    //최고가 정렬도 해보기
    act(() => {
      result.current.setSortType("high");
    });
    // 최고가 먼저 왔는지 확인(5000)
    expect(result.current.products[0].rawPrice).toBe(5000);
    expect(result.current.products[1].rawPrice).toBe(1000);
  });
});
