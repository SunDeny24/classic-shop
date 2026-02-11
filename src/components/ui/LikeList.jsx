//위시리스트 UI 컴포넌트
'use client';

import Link from 'next/link';
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
                <div className="flex flex-col items-center py-20 ">
                    <div className="text-6xl mb-4">🤍</div>
                    <p className="text-zinc-500 text-lg font-medium mb-4">아직 좋아요 버튼을 누른 상품이 없습니다.</p>
                    <Link
                        href="/"
                        className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full font-semibold hover:bg-zinc-800 transition-colors"
                    >
                        상품 보러가기
                    </Link>
                </div>
            ) : (
                <ProductCardGrid gridClass={gridClass} productInfo={displayProducts} isLoading={false} />
            )}
        </div>
    );
}
