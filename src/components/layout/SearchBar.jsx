import Link from 'next/link';
export default function SearchBar({ open, setOpen }) {
    const handleChange = () => {
        setOpen(true);
    };
    return (
        <div onClick={handleChange} className="relative w-full">
            <input
                type="text"
                placeholder="찾으시는 상품을 검색해보세요"
                onFocus={handleChange}
                readOnly
                class="w-full bg-gray-100 border-none rounded-full py-3 pl-12 pr-6 focus:outline-none cursor-pointer hover:bg-gray-200 transition-colors"
            />
            <svg
                class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
            </svg>
        </div>
    );
}
