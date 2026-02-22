//장바구니 페이지

import CartPage from '@/components/ui/CartPage';
export default function ShoppingCart() {
    return (
        <div className="w-full min-h-screen bg-zinc-50 dark:bg-black font-sans">
            <div className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-7">
                    <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">장바구니</h2>
                    <p className="mt-2 text-zinc-500">바로구매 버튼을 통해 구매하세요</p>
                </div>
            </div>
            <main className="max-w-7xl mx-auto px-6 py-10">
                <CartPage />
            </main>
        </div>
    );
}
