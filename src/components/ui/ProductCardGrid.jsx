//상품 카드 배치용 컴포넌트
// src/components/ui/ProductCardGrid.jsx

import ProductCard from './ProductCard';

export default function ProductCardGrid({ gridClass, productInfo }) {
    if (!productInfo || productInfo.length === 0) {
        //console.log('2productInfo : ', productInfo);
        return null;
        // 나중에 스켈레톤/빈 상태 ui 로변경하고 들어온 array 유효한지 확인하는 코드 넣기
    }
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
