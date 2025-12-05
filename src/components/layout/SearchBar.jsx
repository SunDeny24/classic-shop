import Link from 'next/link';
export default function SearchBar({ open, setOpen }) {
    const handleChange = () => {
        console.log('검색모달로 이동');
        setOpen(true);
    };
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="검색"
                onFocus={handleChange}
                className="border border-gray-300 rounded-full py-2 px-4 w-64 focus:outline-none"
            />
            <button onClick={handleChange} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                    className="w-5 h-5 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </button>
        </div>
    );
}
