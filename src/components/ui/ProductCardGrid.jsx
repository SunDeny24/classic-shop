//상품 카드 배치용 컴포넌트
// src/components/ui/ProductCardGrid.jsx

import ProductCard from './ProductCard';
import ProductCardSkeleton from './skeleton/ProductCardSkeleton';

export default function ProductCardGrid({ gridClass, productInfo, isLoading }) {
    if (isLoading) {
        return (
            <section>
                <div className={gridClass}>
                    {
                        //가짜 배열 12개만들어서 스켈레톤 UI 컴포넌트 추가
                        Array.from({ length: 12 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    }
                </div>
            </section>
        );
    }
    //데이터 없을 경우
    if (!productInfo || productInfo.length === 0) {
        return <div className="py-20 text-center text-zinc-400">상품이 없습니다.</div>;
    }
    //데이터 있을 때
    return (
        <section>
            <div className={gridClass}>
                {productInfo.map((product) => (
                    <ProductCard key={product.productId} productData={product} />
                ))}
            </div>
        </section>
    );
}
