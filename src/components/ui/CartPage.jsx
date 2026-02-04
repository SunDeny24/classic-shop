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
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 border-gray-200 border-b pb-3">{`주문 상품 ${cart.length}개`}</h2>
                    {cart.map((item) => (
                        <div key={item.productId} className="flex items-center border-gray-200 py-4 border-b">
                            <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover" />
                            <div className="flex-1 ml-4">
                                <p className="text-sm text-gray-600">{item.brand}</p>
                                <Link
                                    href={{
                                        pathname: `/product/${item.productId}`,
                                        query: {
                                            data: encodeURIComponent(JSON.stringify(item)),
                                        },
                                    }}
                                >
                                    <p className="text-lg mr-6 font-medium hover:underline">{item.title}</p>
                                </Link>
                                <p className="text-lg font-bold mt-1">{`${item.lprice}원`}</p>
                            </div>

                            <div className="flex flex-col h-24 justify-between items-end ">
                                {/* x 버튼 (상품 삭제) */}
                                <button
                                    onClick={() => hadleRemoveItem(item.productId)}
                                    className="text-gray-400 hover:text-black"
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

                                {/* 바로 구매버튼 */}
                                <a
                                    className="border border-zinc-300 rounded-md text-xs font-medium text-zinc-500 hover:text-blue-600 hover:border-blue-600 transition-all duration-200 cursor-pointer rounded-lg py-2 px-4 text-sm "
                                    href={item.link}
                                    target="_blank"
                                >
                                    바로 구매
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-200  pb-3">결제 정보</h2>
                        <div className="space-y-3">
                            {/* 상품금액 */}
                            <div className="flex justify-between">
                                <span className="text-gray-600">상품 금액</span>
                                <span className="font-medium">{`${formatPrice(price)} 원`}</span>
                            </div>
                            {/* 배송비 */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-1">
                                    <span className="text-gray-600">배송비</span>
                                    <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-full border border-blue-100">
                                        무료배송 이벤트
                                    </span>
                                </div>
                                <span className="font-medium text-blue-600">0 원</span>
                            </div>
                            {/* 총 금액 */}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-lg font-semibold">총 결제 금액</span>
                                    <span className="text-2xl font-bold text-blue-600">{`${formatPrice(price)} 원`}</span>
                                </div>
                            </div>
                        </div>
                        <button className="mt-6 cursor-not-allowed w-full bg-blue-600 text-white text-lg font-bold py-3 rounded-lg hover:bg-blue-700">
                            주문하기
                        </button>
                        {/*결제 기능은 준비 중입니다. (바로 구매) 버튼으로 개별 구매를 진행해 주세요!*/}
                    </div>
                    <div className="m-5 text-center">
                        <span className="text-gray-600 text-sm ">장바구니는 최대 20개의 상품을 담을 수 있습니다.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
