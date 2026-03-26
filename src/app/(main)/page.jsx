//홈페이지 메인 콘텐츠 정의
//app/(main)/page.jsx

import RecentProducts from '@/components/ui/RecentProducts';
import RecommendSection from '@/components/ui/RecommendSection';
import CategoryList from '@/components/ui/CategoryList';

export const metadata = {
    title: 'Skipick',
    description: 'Skipick에서 빠르게 선택하는 추천상품과 최근 본 상품을 확인하세요. 카테고리별 쇼핑도 가능합니다.',
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    other: {
        keywords: 'Skipick, 스킵픽, 빠른선택, 온라인쇼핑몰, 추천상품, 최근 본 상품, 카테고리, 쇼핑몰, 장바구니',
    },
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        siteName: 'Skipick',
        title: 'Skipick',
        description: '빠른선택 쇼핑몰 Skipick에서 추천상품과 최근 본 상품을 확인하세요.',
        url: '/',
        images: [
            {
                url: '/images/Skipick_og.png',
                width: 1200,
                height: 630,
                alt: 'Skipick',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Skipick',
        description: '빠른선택 쇼핑몰 Skipick에서 추천상품과 최근 본 상품을 확인하세요.',
        images: ['/images/Skipick_og.png'],
    },
};

export default function Home() {
    return (
        <div className="w-full bg-white">
            {/* 카테고리 섹션 */}
            <section className="max-w-screen-xl mx-auto ">
                <CategoryList />
            </section>
            {/* 추천상품 섹션 */}
            <section className="w-full bg-zinc-100 mt-8 py-10 ">
                <RecommendSection />
            </section>
            {/* 최근 본 상품 섹션 */}
            <section className="max-w-screen-xl mx-auto mt-8 p-8">
                <div className="flex flex-col mb-8">
                    <h2 className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-1">
                        Recently Viewed Products
                    </h2>
                    <h3 className="text-2xl font-bold text-zinc-900 ">최근 본 상품</h3>
                </div>
                <RecentProducts />
            </section>
        </div>
    );
}
