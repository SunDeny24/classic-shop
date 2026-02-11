// 위시리스트
// src/app/(main)/wishilist/page.jsx

import LikeList from '@/components/ui/LikeList';
export default function WishList() {
    return (
        <div className="w-full min-h-screen bg-zinc-50 dark:bg-black font-sans">
            <div className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-7">
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">내가 찜한 상품</h2>
                    <p className="mt-2 text-zinc-500">관심 있는 상품을 한곳에서 확인하세요.</p>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-10">
                <LikeList />
            </main>
        </div>
    );
}
