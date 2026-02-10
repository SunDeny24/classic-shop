//상세페이지 데이터 보여주는 클라이언트 컴포넌트
'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useShopping } from '@/context/ShoppingContext';

export default function ProductResultDetail() {
    const { cart, setCart, wishList, setWishList } = useShopping([]);
    const searchParams = useSearchParams();

    const [product, setProduct] = useState(null);
    const [mounted, setMounted] = useState(false);

    //렌더시 서버와 결과값 맞추기 위해 useEffect내에서 마운트시 searchParams 사용
    useEffect(() => {
        setMounted(true);
        const dataParams = searchParams.get('data');
        if (!dataParams) return;
        try {
            const product = JSON.parse(decodeURIComponent(dataParams));
            setProduct(product);
        } catch (e) {
            console.error('상품 데이터 파싱 실패 :', e);
        }
    }, []);

    //최근 본 상품 상품데이터 포맷저장 객체생성
    const productData = useMemo(() => {
        if (!product) return null;
        return {
            productId: product.productId,
            brand: product.brand,
            title: product.title,
            image: product.image,
            lprice: product.lprice,
            link: product.link,
            rawPrice: product.rawPrice,
        };
    }, [product]);

    useEffect(() => {
        if (!productData) return;

        // 1. 최근 본 상품에 상세페이지 들어갔던 이력 저장
        const savedProducts = localStorage.getItem('recent_products');
        const prevList = savedProducts ? JSON.parse(savedProducts) : [];
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
    }, [productData]);

    const handleAddCart = () => {
        if (!productData) return;

        //로컬에서 장바구니에 이미 있는 상품인지 확인
        const isExist = cart.find((item) => item.productId === productData.productId);
        if (isExist) {
            alert('이미 장바구니에 담긴 상품입니다.');
            return;
        }
        //새로운 상품 추가
        setCart([...cart, { ...productData, quantity: 1 }]);
        alert('장바구니에 상품을 담았습니다.');
        // 추후 팝업 로직 추가
    };

    // 해당 상품ID가 맞으면 TRUE 아니면 FALSE 토글처리
    const isLiked = productData ? wishList.some((item) => item.productId === productData.productId) : false;

    const toggleLike = (e) => {
        e.preventDefault(); // 링크 이동 방지 (부모가 Link일 경우)
        e.stopPropagation(); // 부모 요소(카드 링크) 클릭 방지

        if (!productData) return;

        if (isLiked) {
            // 선택이 되어있다면 선택된 상품과 다른 상품들만 가져옴
            const updatedLikes = wishList.filter((item) => item.productId !== productData.productId);
            setWishList(updatedLikes);
        } else {
            // 선택이 되어있지 않다면 추가
            setWishList([productData, ...wishList]);
        }
    };

    if (!mounted || !product) {
        return <div className="p-20 text-center">상품 정보를 불러오는 중입니다...</div>;
    }

    return (
        <div className="max-w-screen-xl mx-auto p-5 bg-white">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2">
                    <img src={product.image} alt={product.title} className="w-full rounded-lg shadow-lg" />
                </div>

                <div className="md:w-1/2 flex flex-col">
                    <p className="text-lg font-semibold text-gray-600">{product.brand}</p>
                    <h1 className="text-2xl font-bold text-gray-900 mt-2">{product.title}</h1>
                    <p className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                        {product.lprice}
                        <span className="text-2xl">원</span>
                    </p>

                    <div className="flex items-center space-x-4 mt-auto pt-6 ">
                        <div
                            onClick={handleAddCart}
                            className="flex-1 flex items-center justify-center bg-gray-500 text-white text-lg font-bold py-4 rounded-lg hover:bg-black transition-colors"
                        >
                            장바구니
                        </div>
                        <div className="flex-1 bg-blue-600 rounded-lg hover:bg-blue-800 transition-colors">
                            <a
                                className="flex items-center justify-center w-full h-full py-4 text-white text-lg font-bold"
                                href={product.link}
                                target="_blank"
                            >
                                바로 구매
                            </a>
                        </div>
                        <div
                            onClick={toggleLike}
                            data-like-button
                            className="flex items-center justify-center border border-gray-300 rounded-lg w-[60px] h-[60px] hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className={`w-7 h-7 text-gray-500  ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`}
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
