// CartPage 컴포넌트 단위 테스트
// - 장바구니 비었을때 0원, 0개인지 확인
// - 장바구니에 정보 정확히 렌더링되는지 확인
// - 장바구니에 가격 합산 제대로 되는지 확인
// - 장바구니 제대로 삭제 되는지 확인

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import CartPage from "./CartPage";
import * as storeModule from "@/store/useShoppingStore";
import { createMockCuratedProduct } from "@/test/mockFactory";
import { ProductStorageData } from "@/types/fashion";

// 가짜 이미지 next/image 모듈 모킹
interface MockImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}
vi.mock("next/image", () => ({
  default: (props: MockImageProps) => (
    <div role="img" aria-label={props.alt} className={props.className} />
  ),
}));
// 가짜 링크 next/link 모듈 모킹 : a태그로 바꿔 렌더링
interface MockLinkProps {
  href: string | { pathname: string; query?: Record<string, string> }; //단순문자거나 객체일수있다
  children: React.ReactNode;
}
vi.mock("next/link", () => ({
  default: ({ children, href }: MockLinkProps) => {
    // 객체 형태면 pathname을, 문자열이면 그대로 href로 사용
    const path = typeof href === "string" ? href : href.pathname;
    return <a href={path}>{children}</a>;
  },
}));

describe("CartPage 컴포넌트 단위 테스트", () => {
  const mockRemoveItem = vi.fn();
  // 테스트용 데이터
  const productA = createMockCuratedProduct({
    productId: "1",
    title: "나이키 에어포스",
    brand: "나이키",
    rawPrice: 10000,
    lprice: "10,000",
  });

  const productB = createMockCuratedProduct({
    productId: "2",
    title: "아디다스 슈퍼스타",
    brand: "아디다스",
    rawPrice: 20000,
    lprice: "20,000",
  });

  // 스토어 설정 함수
  const setupMockStore = (initialCart: ProductStorageData[] = []) => {
    vi.spyOn(storeModule, "useShoppingStore").mockImplementation(
      <T,>(selector: (state: storeModule.ShoppingStore) => T): T =>
        selector({
          cart: initialCart,
          removeItemFromCart: mockRemoveItem,
        } as unknown as storeModule.ShoppingStore),
    );
  };

  //초기화
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("장바구니가 비어있을 때 상품 갯수와 총 금액이 0으로 표시된다", () => {
    setupMockStore([]); //비어있을때
    render(<CartPage />); //컴포넌트 가상 DOM에 렌더링

    // 주문상품 0개 텍스트 있는지 확인
    expect(screen.getByText("주문 상품 0개")).toBeInTheDocument();

    //0원 텍스트가 상품금액, 총 금액 두군데에 텍스트 있는지 확인
    const zeroPrices = screen.getAllByText("0 원");
    expect(zeroPrices).toHaveLength(2);
  });

  it("장바구니에 담긴 상품들의 정보(브랜드, 이름, 가격)가 정상적으로 렌더링된다", () => {
    setupMockStore([productA, productB]); //상품 2개 셋팅
    render(<CartPage />);

    // 보낸 상품데이터 동일한지 확인
    expect(screen.getByText("주문 상품 2개")).toBeInTheDocument();
    expect(screen.getByText("나이키 에어포스")).toBeInTheDocument();
    expect(screen.getByText("나이키")).toBeInTheDocument();
    expect(screen.getByText("10,000원")).toBeInTheDocument();
    expect(screen.getByText("아디다스 슈퍼스타")).toBeInTheDocument();
  });

  it("장바구니에 담긴 모든 상품의 가격(rawPrice)이 합산되어 총 금액으로 표시된다", () => {
    setupMockStore([productA, productB]); //10,000+20,000
    render(<CartPage />);

    // 총 금액 잘 나오는지 확인, 상품금액, 총 금액 두개 뜨는지 확인
    const totalPrices = screen.getAllByText("30,000 원");
    expect(totalPrices).toHaveLength(2);
  });

  it("상품의 X 버튼을 클릭하면 removeItemFromCart 함수가 해당 productId와 함께 호출된다", async () => {
    // 가상 유저생성
    const user = userEvent.setup();
    setupMockStore([productA]); // 상품 1개 셋팅
    render(<CartPage />); //가상 DOM 렌더링

    // 유저가 닫기 버튼을 누르는지 기다림
    const removeButton = screen.getByRole("button");
    await user.click(removeButton);

    // 1번 실행되었는지, prodcutId가 1인지 확인
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
    expect(mockRemoveItem).toHaveBeenCalledWith("1");
  });
});
