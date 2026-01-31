//상세페이지 데이터 보여주는 클라이언트 컴포넌트
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ProductResultDetail() {
    const searchParams = useSearchParams();
    const dataParams = searchParams.get('data');
    if (!dataParams) {
        return <div>상품 상세 페이지를 불러오지 못했습니다.</div>;
    }
    const product = JSON.parse(decodeURIComponent(dataParams));

    //최근 본 상품 상품데이터 포맷저장 객체생성
    const productData = {
        productId: product.productId,
        brand: product.brand,
        title: product.title,
        image: product.image,
        lprice: product.lprice,
    };

    useEffect(() => {
        // 1. 최근 본 상품에 상세페이지 들어갔던 이력 저장
        const saved = localStorage.getItem('recent_products');
        const prevList = saved ? JSON.parse(saved) : [];
        // 기존 데이터에 추가하고 4개 제한함
        const newProduct = [productData, ...prevList.filter((item) => item.productId !== productData.productId)].slice(
            0,
            4,
        );

        localStorage.setItem('recent_products', JSON.stringify(newProduct));

        // 2. 최근 검색어 순서 업데이트
        if (product.keyword) {
            const savedSearches = localStorage.getItem('recent_searches');
            const prevSearches = savedSearches ? JSON.parse(savedSearches) : [];
            const newSearches = [product.keyword, ...prevSearches.filter((k) => k !== product.keyword)].slice(0, 10);
            localStorage.setItem('recent_searches', JSON.stringify(newSearches));
        }
    }, [product.productId]);

    return (
        <div className="max-w-screen-xl mx-auto p-5 bg-white">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                    <img src={product.image} alt={product.title} className="w-full rounded-lg shadow-lg" />
                </div>

                <div className="md:w-1/2 flex flex-col">
                    <p className="text-lg font-semibold text-gray-600">{product.brand}</p>
                    <h1 className="text-2xl font-bold text-gray-900 mt-2">{product.title}</h1>
                    <p className="text-3xl font-bold text-gray-900 mt-4 mb-6">{product.lprice}</p>

                    <div className="flex items-center space-x-4 mt-auto pt-6 ">
                        <div className="flex-1 flex items-center justify-center bg-gray-500 text-white text-lg font-bold py-4 rounded-lg hover:bg-black transition-colors">
                            장바구니
                        </div>
                        <div className="flex-1 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors">
                            <a
                                className="flex items-center justify-center w-full h-full py-4 text-white text-lg font-bold"
                                href={product.link}
                                target="_blank"
                            >
                                바로 주문
                            </a>
                        </div>
                        <div
                            data-like-button
                            className="flex items-center justify-center border border-gray-300 rounded-lg w-[60px] h-[60px] hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className="w-7 h-7 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
