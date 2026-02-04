//위시리스트 UI 컴포넌트
'use client';

import ProductCardGrid from './ProductCardGrid';
import { useShopping } from '@/context/ShoppingContext';

export default function LikeList({ limit = null }) {
    const { wishList } = useShopping([]);

    const displayProducts = limit ? wishList.slice(0, limit) : wishList;

    const gridClass = limit
        ? 'grid grid-cols-2 md:grid-cols-4 gap-4'
        : 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10';
    //limit값에 따라 css 변경 (마이페이지/ 위시리스트)

    const isEmpty = wishList.length === 0;

    return (
        <div>
            {isEmpty ? (
                <div className="">
                    <p className="text-zinc-400 mb-4">아직 좋아요 버튼을 누른 상품이 없습니다</p>
                </div>
            ) : (
                <ProductCardGrid
                    gridClass={gridClass}
                    productInfo={displayProducts}
                    isLoading={false} // 여기서 isLoading을 그대로 전달!
                />
            )}
        </div>
    );
}
