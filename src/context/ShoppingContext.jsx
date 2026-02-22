//장바구니, wishlist Context
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ShoppingContext = createContext();

export default function ShoppingProvider({ children }) {
    /* 로컬스토리지 접근 전 확인 후 초기화 */
    const [cart, setCart] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });
    const [wishList, setWishList] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('wishList');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    /* 팝업관련 상태 */
    const [showPopup, setShowPopup] = useState(false);
    const [popupConfig, setPopupConfig] = useState({ title: '', message: '', type: '' });

    const MAX_CART_LIMIT = 20; //장바구니 최대갯수 20
    const MAX_WISH_LIMIT = 50; //위시리스트 최대갯수 50

    /* 데이터 셋팅 */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('wishList', JSON.stringify(wishList));
    }, [cart, wishList]);

    /* 장바구니 담기 함수 */
    const addItemToCart = (productData) => {
        if (!productData) return;

        //로컬에서 장바구니에 이미 있는 상품인지 확인
        const isExist = cart.find((item) => item.productId === productData.productId);

        if (isExist) {
            //이미 담긴 상품에 경우 팝업 오픈
            setPopupConfig({
                title: '이미 담긴 상품',
                message: '이미 장바구니에 있는 상품입니다. 장바구니로 이동하시겠습니까?',
                type: 'EXIST',
            });
        } else {
            //새로운 상품 추가, 갯수제한, 팝업 오픈
            if (cart.length >= MAX_CART_LIMIT) {
                setPopupConfig({
                    title: '장바구니 가득참',
                    message: `장바구니는 최대 ${MAX_CART_LIMIT}개까지만 담을 수 있습니다.`,
                    type: 'LIMIT',
                    targetPath: '/cart',
                });
                setShowPopup(true);
                return;
            }
            //갯수제한 없으면 상품 담기
            setCart([...cart, { ...productData, quantity: 1 }]);
            setPopupConfig({
                title: '장바구니 담기 성공',
                message: '상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?',
                type: 'SUCCESS',
            });
        }
        setShowPopup(true);
    };

    /* 위시리스트 담기 함수 */
    const toggleWishList = (productData) => {
        if (!productData) return;
        const isLiked = wishList.some((item) => item.productId === productData.productId);
        if (isLiked) {
            setWishList(wishList.filter((item) => item.productId !== productData.productId));
        } else {
            if (wishList.length >= MAX_WISH_LIMIT) {
                setPopupConfig({
                    title: '위시리스트 가득참',
                    message: `위시리스트는 최대 ${MAX_WISH_LIMIT}개까지 가능합니다.`,
                    type: 'LIMIT',
                    targetPath: '/wishlist',
                });
                setShowPopup(true);
                return;
            }
            setWishList([productData, ...wishList]);
        }
    };

    return (
        <ShoppingContext
            value={{
                cart,
                wishList,
                setCart,
                setWishList,
                addItemToCart,
                toggleWishList,
                showPopup,
                setShowPopup,
                popupConfig,
                setPopupConfig,
            }}
        >
            {children}
        </ShoppingContext>
    );
}

// useShopping 커스텀 훅으로 사용
export const useShopping = () => {
    const shopValue = useContext(ShoppingContext);
    if (!shopValue) {
        throw new Error('useShopping은 ShoppingProvider 내에서만 사용가능합니다.');
    }
    return shopValue;
};
