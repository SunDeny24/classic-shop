//상품 카드 배치용 컴포넌트
// app/components/ui/ProductCardGrid.jsx

import ProductCard from './ProductCard';

export default function ProductCardGrid({ gridClass, productInfo }) {
    console.log('1productInfo : ', productInfo);
    // if (!productInfo || productInfo.length === 0) {
    //     console.log('2productInfo : ', productInfo);
    //     return null; // 나중에 스켈레톤/빈 상태 ui
    // }
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
