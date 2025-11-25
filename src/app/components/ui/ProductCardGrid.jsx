//상품 카드 배치용 컴포넌트
// app/components/ui/ProductCardGrid.jsx

import ProductCard from './ProductCard';

export default function ProductCardGrid({ gridClass, productInfo }) {
    return (
        <section>
            <div className={gridClass}>
                {productInfo.map((product) => (
                    <ProductCard key={product.id} productData={product} />
                ))}
            </div>
        </section>
    );
}
