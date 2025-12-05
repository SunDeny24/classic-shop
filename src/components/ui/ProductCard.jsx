//상품 카드 컴포넌트
// src/components/ui/ProductCard.jsx

import Link from 'next/link';

export default function ProductCard({ productData }) {
    console.log(productData);
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden group">
            <Link href={`/product/${productData.productId}`}>
                <div className="relative">
                    <img
                        src={productData.image}
                        alt={productData.title}
                        className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                    />
                    <button data-like-button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 016.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-sm font-semibold text-gray-600">{productData.brand}</p>
                    <h3 className="text-lg font-medium text-gray-900 truncate">{productData.title}</h3>
                    <p className="text-xl font-bold text-gray-900 mt-1">{productData.lprice}</p>
                </div>
            </Link>
        </div>
    );
}
