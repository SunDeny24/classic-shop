//장바구니 Context
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

    /* 데이터 셋팅 */
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('wishList', JSON.stringify(wishList));
    }, [cart, wishList]);

    return <ShoppingContext value={{ cart, wishList, setCart, setWishList }}>{children}</ShoppingContext>;
}

// useShopping 커스텀 훅으로 사용
export const useShopping = () => {
    const shopValue = useContext(ShoppingContext);
    if (!shopValue) {
        throw new Error('useShopping은 ShoppingProvider 내에서만 사용가능합니다.');
    }
    return shopValue;
};
