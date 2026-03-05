// 장바구니 UI 컴포넌트
'use client';

import { useShopping } from '@/context/ShoppingContext';
import Link from 'next/link';
import { useMemo } from 'react';
import formatPrice from '@/utils/formatPrice';

export default function CartPage() {
    const { cart, setCart } = useShopping();

    /* 장바구니 상품 삭제 함수 */
    const hadleRemoveItem = (productId) => {
        const updatedCart = cart.filter((item) => item.productId != productId);
        setCart(updatedCart);
    };

    /* 장바구니 총 금액계산 */
    const price = useMemo(() => {
        return cart.reduce((acc, cur) => {
            return acc + Number(cur.rawPrice);
        }, 0);
    }, [cart]);

    return (
        <div>
            <div className="w-full min-h-screen bg-zinc-50 ">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* 주문상품정보 섹션 */}
                    <div className="lg:w-2/3 bg-white rounded-lg  shadow-md p-6">
                        {/* 주문상품 갯수 */}
                        <h2 className="text-xl font-semibold mb-4 border-gray-200 border-b pb-3">{`주문 상품 ${cart.length}개`}</h2>

                        {/* 주문상품 */}
                        {cart.map((item) => (
                            <div
                                key={item.productId}
                                className="flex flex-col sm:flex-row border-gray-200 py-4 border-b relative"
                            >
                                {/* 상단 : 이미지, 상품정보 */}
                                <div className="flex items-start w-full pt-3 sm:p-0">
                                    {/* 1. 이미지 */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-18 h-18 sm:w-24 sm:h-24 rounded-lg object-cover flex-shrink-0"
                                    />
                                    {/* 2. 상품정보 : 브랜드, 상품명, 가격, (모바일 바로구매버튼) */}
                                    <div className="flex-1 ml-3 sm:ml-4 ">
                                        {/* 1) 브랜드 */}
                                        <p className="text-[13px] sm:text-sm text-gray-600">{item.brand}</p>
                                        {/* 2) 상품명 */}
                                        <Link
                                            href={{
                                                pathname: `/product/${item.productId}`,
                                                query: {
                                                    data: encodeURIComponent(JSON.stringify(item)),
                                                },
                                            }}
                                        >
                                            <p className="text-sm sm:text-lg mr-6 font-medium hover:underline">
                                                {item.title}
                                            </p>
                                        </Link>
                                        {/* 3) 가격 */}
                                        <p className="text-lg font-bold mt-1">{`${item.lprice}원`}</p>
                                        {/* 4) 바로구매 버튼 (모바일 전용) */}
                                        <div className="mt-3 sm:hidden flex justify-end">
                                            <a
                                                className="inline-block border border-zinc-300 rounded-lg py-1.5 px-3 whitespace-nowrap text-xs font-medium text-zinc-600 hover:text-blue-600 hover:border-blue-600 transition-all"
                                                href={item.link}
                                                target="_blank"
                                            >
                                                바로 구매
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* 우측 : x 버튼 */}
                                <button
                                    onClick={() => hadleRemoveItem(item.productId)}
                                    className="absolute top-4 right-0 text-gray-400 hover:text-black"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </button>

                                {/* 바로구매 버튼 (PC 전용) */}
                                <div className="hidden sm:flex flex-col justify-end ml-4">
                                    <a
                                        className="inline-block border border-zinc-300 rounded-lg py-1.5 px-3 whitespace-nowrap text-sm font-medium text-zinc-600 hover:text-blue-600 hover:border-blue-600 transition-all"
                                        href={item.link}
                                        target="_blank"
                                    >
                                        바로 구매
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 결제정보 섹션 */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28 space-y-4">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-3">결제 정보</h2>
                                <div className="space-y-3">
                                    {/* 상품금액 */}
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">상품 금액</span>
                                        <span className="font-medium">{`${formatPrice(price)} 원`}</span>
                                    </div>
                                    {/* 총 금액 */}
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-lg font-semibold">총 구매 금액</span>
                                            <span className="text-xl sm:text-2xl font-bold text-blue-600">{`${formatPrice(price)} 원`}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <button className="mt-6 cursor-not-allowed w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-lg hover:bg-blue-700">
                                주문하기
                            </button> */}
                            </div>
                            <div className="m-5 text-center">
                                <span className="text-gray-600 text-sm ">
                                    장바구니는 최대 20개의 상품을 담을 수 있습니다.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
