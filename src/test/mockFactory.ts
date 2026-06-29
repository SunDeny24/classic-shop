// 테스트 위한 mock 팩토리 함수
// -  CuratedProduct 가공된 데이터용
// - ShoppingStore 스토어 용
import { CuratedProduct } from "@/types/fashion";
import { ShoppingStore } from "@/store/useShoppingStore";
import { vi } from "vitest";

export const createMockCuratedProduct = (
  overrides?: Partial<CuratedProduct>,
): CuratedProduct => ({
  productId: "default",
  title: "default",
  image: "",
  brand: "nike",
  link: "",
  lprice: "1,000",
  keyword: "운동화",
  rawPrice: 1000,
  productType: "",
  mallName: "",
  category1: "",
  category2: "",
  category3: "",
  category4: "",
  ...overrides,
});

export function createMockShoppingStore(
  overrides: Partial<ShoppingStore> = {},
): ShoppingStore {
  return {
    cart: [],
    wishList: [],
    showPopup: false,
    popupConfig: {
      title: "",
      message: "",
      type: "",
      targetPath: "",
    },
    setShowPopup: vi.fn(),
    setPopupConfig: vi.fn(),
    addItemToCart: vi.fn(),
    toggleWishList: vi.fn(),
    removeItemFromCart: vi.fn(),

    ...overrides,
  };
}
