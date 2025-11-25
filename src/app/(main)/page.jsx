//홈페이지 메인 콘텐츠 정의
//app/(main)/page.jsx

import ProductCardGrid from '../components/ui/ProductCardGrid';
import WeatherBanner from '../components/ui/WeatherBanner';
import CategoryCardList from '../components/ui/CategoryCardList';

export default function Home() {
    //최근 본 상품 view css class 정의하고 limit-4로 데이터 제한해서 페칭해오기
    const gridClass = 'grid grid-cols-2 md:grid-cols-4 gap-4';

    //임의로 페칭해서 데이터 가져온값 정의
    const productResult = [
        {
            id: '0001',
            image: 'https://picsum.photos/seed/product1/400/400',
            brand: '브랜드1',
            productName: '상품명1',
            price: '300,450',
        },
        {
            id: '0002',
            image: 'https://picsum.photos/seed/product2/400/400',
            brand: '브랜드2',
            productName: '상품명2',
            price: '200,100',
        },
        {
            id: '0003',
            image: 'https://picsum.photos/seed/product3/400/400',
            brand: '브랜드3',
            productName: '상품명3',
            price: '80,500',
        },
        {
            id: '0004',
            image: 'https://picsum.photos/seed/product4/400/400',
            brand: '브랜드4',
            productName: '상품명4',
            price: '108,100',
        },
    ];

    return (
        <div className="bg-zinc-50 font-sans ">
            <div className="max-w-screen-xl mx-auto p-5 bg-white ">
                <WeatherBanner />
                <section className="border">
                    <h2 className="text-2xl font-bold mb-6 text-center">카테고리목록</h2>
                    <CategoryCardList />
                </section>
                <section className="border">
                    <h2 className="text-2xl font-bold mb-6 text-center">최근 본 상품</h2>
                    <ProductCardGrid gridClass={gridClass} productInfo={productResult} />
                </section>
            </div>
        </div>
    );
}
