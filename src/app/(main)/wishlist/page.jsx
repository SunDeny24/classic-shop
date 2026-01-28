// 위시리스트
// src/app/(main)/wishilist/page.jsx

import LikeList from '@/components/ui/LikeList';
export default function WishList() {
    return (
        <div className="max-w-7xl mx-auto px-4 w-full bg-zinc-50 font-sans dark:bg-black">
            <div className="p-5">
                <LikeList />
            </div>
        </div>
    );
}
