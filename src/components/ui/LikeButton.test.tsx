// LikeButton 컴포넌트 단위 테스트
// - 찜하지 않은 상품은 빈 하트로 보임
// - 찜하면 파란색 채운 하트로 보임
// - 하트 클릭시 찜하기 함수 호출됨

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import LikeButton from "./LikeButton";
import * as storeModule from "@/store/useShoppingStore";
import { createMockCuratedProduct } from "@/test/mockFactory";
import { ProductStorageData } from "@/types/fashion";

describe("LikeButton 컴포넌트 단위 테스트", () => {
  const mockProduct = createMockCuratedProduct({ productId: "1234" });
  const mockToggleWishList = vi.fn();

  const setupMockStore = (initialWishList: ProductStorageData[] = []) => {
    vi.spyOn(storeModule, "useShoppingStore").mockImplementation(
      <T,>(selector: (state: storeModule.ShoppingStore) => T): T =>
        selector({
          wishList: initialWishList,
          toggleWishList: mockToggleWishList,
        } as unknown as storeModule.ShoppingStore),
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("위시리스트에 없는 상품은 회색 빈 하트로 렌더링한다.", () => {
    // 빈 배열을 줘서 wishList 비어있게 만듬
    setupMockStore([]);

    // 가상 DOM에 렌더링
    render(<LikeButton productData={mockProduct} />);

    // 화면에서 버튼 롤 찾기
    const button = screen.getByRole("button");
    const svgIcon = button.querySelector("svg");

    //class 회색인지 확인
    expect(svgIcon).toHaveClass("text-gray-400");
    expect(svgIcon).not.toHaveClass("text-blue-600");
  });

  it("위시리스트에 있는 상품은 파란색 꽉 찬 하트를 렌더링한다", () => {
    // 상품이 들어있는 배열을 주입
    setupMockStore([mockProduct]);

    render(<LikeButton productData={mockProduct} />);

    const button = screen.getByRole("button");
    const svgIcon = button.querySelector("svg");

    //꽉찬 파란 하트인지 확인
    expect(svgIcon).toHaveClass("text-blue-600", "fill-current");
  });

  it("버튼을 클릭하면 toggleWishList 함수가 호출된다", async () => {
    const user = userEvent.setup();

    // 셋업: 기본 상태 주입
    setupMockStore([]);

    render(<LikeButton productData={mockProduct} />);

    // 사용자가 버튼 클릭할 때까지 비동기로 대기
    const button = screen.getByRole("button");
    await user.click(button);

    // 검증
    expect(mockToggleWishList).toHaveBeenCalledTimes(1); // 찜하기 스파이함수 몇번 실행되었는지?
    expect(mockToggleWishList).toHaveBeenCalledWith(mockProduct); // 함수 실행시 우리가 넘겨준 데이터가 맞는지?
  });
});
