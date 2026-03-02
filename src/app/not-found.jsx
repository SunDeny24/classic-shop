// src/app/not-found.jsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h2 className="text-4xl font-bold mb-4">헉! 페이지를 찾을 수 없습니다 </h2>
            <p className="text-gray-600 mb-8">요청하신 주소가 올바르지 않거나 변경되었습니다.</p>
            <Link
                href="/"
                className="px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-full font-semibold hover:bg-zinc-700 transition-colors"
            >
                홈으로 돌아가기
            </Link>
        </div>
    );
}
