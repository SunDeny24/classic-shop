'use client';

import { useState, useEffect } from 'react';
import ProductCardGrid from './ProductCardGrid';

export default function LikeList() {
    const [wishProducts, setWishProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const gridClass = 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10'; //상품그리드 css 설정

    // wishlist에 데이터 있는지 확인해서 그것들의 데이터만 그대로 넣어주면됨

    useEffect(() => {
        const savedLikes = localStorage.getItem('wishList');
        const parseLikes = savedLikes ? JSON.parse(savedLikes) : [];
        setWishProducts(parseLikes);
        setIsLoading(false);
        //console.log(parseLikes);
    }, []);

    const isEmpty = !isLoading && wishProducts.length === 0;
    return (
        <div>
            {isEmpty ? (
                <div className="">
                    <p className="text-zinc-400 mb-4">아직 좋아요 버튼을 누른 상품이 없습니다</p>
                </div>
            ) : (
                <ProductCardGrid
                    gridClass={gridClass}
                    productInfo={wishProducts}
                    isLoading={isLoading} // 여기서 isLoading을 그대로 전달!
                />
            )}
        </div>
    );
}
