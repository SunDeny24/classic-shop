//장바구니 페이지

import CartPage from '@/components/ui/CartPage';
export default function ShoppingCart() {
    return (
        <div className="max-w-7xl mx-auto px-4 w-full bg-zinc-50 font-sans dark:bg-black">
            <div className="border p-5">
                <h2 className="text-2xl font-bold mb-6 ">장바구니</h2>
                <CartPage />
            </div>
        </div>
    );
}
