// zustand 스토어 테스트 코드

import { describe, it, expect, beforeEach } from "vitest";
import { useShoppingStore } from "@/store/useShoppingStore";

// 테스트용 모킹(Mock) 데이터 세팅
const mockProduct1 = {
  productId: "1234",
  brand: "폰그리기 케이스",
  title: "변색방지 카드 수납 범퍼 케이스 투명",
  image: "phone.jpg",
  lprice: "10,900",
  link: "https://link1",
  rawPrice: 10900,
  keyword: "핸드폰 케이스",
};
const mockProduct2 = {
  productId: "5678",
  brand: "나이키",
  title: "남자 드라이핏 기능성 반팔",
  image: "tshirts.jpg",
  lprice: "35,900",
  link: "https://link2",
  rawPrice: 35900,
  keyword: "나이키",
};

// 전체 테스트 그룹 설정
describe("useShoppingStore 상태 관리 유닛 테스트", () => {
  // 스토어의 초기 상태 저장
  const initialStoreState = useShoppingStore.getState();

  // 테스트(it) 시작 전 초기상태로 초기화 (테스트 간 오염 방지)
  beforeEach(() => {
    useShoppingStore.setState(initialStoreState, true);
  });

  // 장바구니 기능 테스트 그룹
  describe("장바구니 기능 (Cart)", () => {
    it("아이템을 장바구니에 정상적으로 추가해야 한다.", () => {
      // 준비 및 실행 : 장바구니 추가 기능 함수 가져와서 mockProduct1 장바구니에 추가
      const { addItemToCart } = useShoppingStore.getState();
      addItemToCart(mockProduct1);

      // 스토어 현재 상태 확인
      const { cart } = useShoppingStore.getState();

      //단언 : 길이 늘었는지 1됐는지, 아이템 productId 동일한지 확인
      expect(cart).toHaveLength(1);
      expect(cart[0].productId).toBe("90670706143");
    });

    it("장바구니에 있는 아이템을 정상적으로 삭제해야 한다.", () => {
      // 준비 : 먼저 상품 하나 넣기(mockProduct1)
      const store = useShoppingStore.getState();
      store.addItemToCart(mockProduct1);

      // 실행 : 넣은 상품(mockProduct1) 삭제함수로 삭제하기
      useShoppingStore.getState().removeItemFromCart("90670706143");

      // 단언 : 상품이 삭제됐는지 0인지 길이 확인하기
      expect(useShoppingStore.getState().cart).toHaveLength(0);
    });

    it("총 상품 가격(getTotalPrice)을 정확하게 계산해야 한다.", () => {
      // 준비 : 상품 모두 넣기(mockProduct1,2)
      const store = useShoppingStore.getState();
      store.addItemToCart(mockProduct1); // 10,900원
      store.addItemToCart(mockProduct2); // 35,900원

      // 실행 : 계산 함수 가져오기
      const totalPrice = useShoppingStore.getState().getTotalPrice();
      // 단언 : 총 합인 46800원 맞는지 확인
      expect(totalPrice).toBe(46800);
    });

    //방어 로직 테스트
    it("장바구니 아이템이 20개를 초과할 경우 추가를 막고 팝업을 띄워야 한다. (Edge Case)", () => {
      const store = useShoppingStore.getState();

      // 준비 : 고의로 20개의 아이템을 채웁니다.
      for (let i = 0; i < 20; i++) {
        store.addItemToCart({
          productId: `item-${i}`,
          brand: `브랜드_${i}`,
          title: `타이틀_${i}`,
          image: `이미지_${i}`,
          lprice: `최저가_${i}`,
          link: `링크_${i}`,
          rawPrice: 10000 + i,
          keyword: `키워드_${i}`,
        });
      }

      // 실행 : 21번째 아이템 추가 시도
      store.addItemToCart({
        productId: `overFlow-item`,
        brand: `초과브랜드`,
        title: `초과타이틀`,
        image: `초과이미지`,
        lprice: `초과최저가`,
        link: `초과링크`,
        rawPrice: 10000,
        keyword: `초과키워드`,
      });

      // 단언
      const finalState = useShoppingStore.getState();
      // 카트 개수는 여전히 20개로 방어되어야 함
      expect(finalState.cart).toHaveLength(20);
      // 팝업 트리거 상태 검증
      expect(finalState.showPopup).toBe(true);
      // 메시지에 20개 제한 안내가 있는지 확인
      expect(finalState.popupConfig?.message).toContain("20개");
    });
  });

  describe("위시리스트 기능 (WishList)", () => {
    it("위시리스트에 없는 아이템은 추가하고, 있는 아이템은 제거해야 한다. (Toggle)", () => {
      const store = useShoppingStore.getState();

      // 1차 토글: 추가
      store.toggleWishList(mockProduct1);
      expect(useShoppingStore.getState().wishList).toHaveLength(1);

      // 2차 토글: 제거
      store.toggleWishList(mockProduct1);
      expect(useShoppingStore.getState().wishList).toHaveLength(0);
    });

    it("위시리스트 아이템이 50개를 초과할 경우 팝업을 띄워야 한다. (Edge Case)", () => {
      const store = useShoppingStore.getState();

      // 고의로 50개의 아이템을 채웁니다.
      for (let i = 0; i < 50; i++) {
        store.toggleWishList({
          productId: `item-${i}`,
          brand: `브랜드_${i}`,
          title: `타이틀_${i}`,
          image: `이미지_${i}`,
          lprice: `최저가_${i}`,
          link: `링크_${i}`,
          rawPrice: 20000 + i,
          keyword: `키워드_${i}`,
        });
      }

      // 51번째 아이템 토글 (추가) 시도
      store.toggleWishList({
        productId: `overFlow-item`,
        brand: `초과브랜드`,
        title: `초과타이틀`,
        image: `초과이미지`,
        lprice: `초과최저가`,
        link: `초과링크`,
        rawPrice: 20000,
        keyword: `초과키워드`,
      });

      const finalState = useShoppingStore.getState();

      expect(finalState.wishList).toHaveLength(50);
      expect(finalState.showPopup).toBe(true);
      expect(finalState.popupConfig?.message).toContain("50개");
    });
  });
});
