// src/store/useShoppingStore.ts
// zustand 사용해서 쇼핑 관련 상태관리 (장바구니, 위시리스트, 팝업)하는 스토어

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductStorageData } from "@/types/fashion";

interface ShoppingStore {
  cart: (ProductStorageData & { quantity: number })[];
  wishList: ProductStorageData[];
  showPopup: boolean;
  popupConfig: {
    title: string;
    message: string;
    type: string;
    targetPath?: string;
  };
  setShowPopup: (show: boolean) => void;
  setPopupConfig: (config: Partial<ShoppingStore["popupConfig"]>) => void;
  addItemToCart: (productData: ProductStorageData) => void;
  toggleWishList: (productData: ProductStorageData) => void;
  removeItemFromCart: (productId: string) => void;
}

export const useShoppingStore = create<ShoppingStore>()(
  persist(
    (set, get) => ({
      //카트, 위시리스트
      cart: [],
      wishList: [],
      //팝업
      showPopup: false,
      popupConfig: { title: "", message: "", type: "", targetPath: "" },

      setShowPopup: (show) => set({ showPopup: show }),
      setPopupConfig: (config) =>
        set((state) => ({
          popupConfig: { ...state.popupConfig, ...config },
        })),

      /* 장바구니 담기 함수 */
      addItemToCart: (productData) => {
        const { cart } = get();
        const MAX_CART_LIMIT = 20; //장바구니 최대갯수 20

        //로컬에서 장바구니에 이미 있는 상품인지 확인
        const isExist = cart.find(
          (item) => item.productId === productData.productId,
        );

        if (isExist) {
          //이미 담긴 상품에 경우 팝업 오픈
          set({
            popupConfig: {
              title: "이미 담긴 상품",
              message:
                "이미 장바구니에 있는 상품입니다. 장바구니로 이동하시겠습니까?",
              type: "EXIST",
            },
            showPopup: true,
          });
        } else {
          //새로운 상품 추가, 갯수제한, 팝업 오픈
          if (cart.length >= MAX_CART_LIMIT) {
            set({
              popupConfig: {
                title: "장바구니 가득참",
                message: `장바구니는 최대 ${MAX_CART_LIMIT}개까지만 담을 수 있습니다.`,
                type: "LIMIT",
                targetPath: "/cart",
              },
              showPopup: true,
            });
            return;
          }
          //갯수제한 없으면 상품 담기
          set({
            cart: [...cart, { ...productData, quantity: 1 }],
            popupConfig: {
              title: "장바구니 담기 성공",
              message:
                "상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?",
              type: "SUCCESS",
            },
            showPopup: true,
          });
        }
      },

      /* 위시리스트 담기 함수 */
      toggleWishList: (productData) => {
        if (!productData) return;
        const { wishList } = get();
        const MAX_WISH_LIMIT = 50; //위시리스트 최대갯수 50

        // 위시리스트 되어있는지 확인
        const isLiked = wishList.some(
          (item) => item.productId === productData.productId,
        );

        if (isLiked) {
          // 위시리스트 되어있다면 제거
          set({
            wishList: wishList.filter(
              (item) => item.productId !== productData.productId,
            ),
          });
        } else {
          // 갯수제한해서 위시리스트 없다면 추가
          if (wishList.length >= MAX_WISH_LIMIT) {
            set({
              popupConfig: {
                title: "위시리스트 가득참",
                message: `위시리스트는 최대 ${MAX_WISH_LIMIT}개까지 가능합니다.`,
                type: "LIMIT",
                targetPath: "/wishlist",
              },
              showPopup: true,
            });
            return;
          }
          set({
            wishList: [productData, ...wishList], //새로운데이터 + 기존데이터로 셋팅
          });
        }
      },

      /* 장바구니 상품 삭제 함수 */
      removeItemFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter((item) => item.productId !== productId),
        });
      },
    }),
    // 로컬스토리지에 저장될 키이름 지정
    {
      name: "shopping-storage",
    },
  ),
);
