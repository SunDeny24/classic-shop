import Link from 'next/link';
export default function Navigation() {
    //useSearchParams를 사용해서 query값 추출
    return (
        <div className="flex space-x-6">
            <Link href="/search/아우터" className="text-gray-700 font-medium hover:text-blue-600">
                아우터
            </Link>
            <Link href="/search/상의" className="text-gray-700 font-medium hover:text-blue-600">
                상의
            </Link>
            <Link href="/search/하의" className="text-gray-700 font-medium hover:text-blue-600">
                하의
            </Link>
            <Link href="/search/패션소품" className="text-gray-700 font-medium hover:text-blue-600">
                패션소품
            </Link>
            <Link href="/search/신발" className="text-gray-700 font-medium hover:text-blue-600">
                신발
            </Link>
            <Link href="/search/가방" className="text-gray-700 font-medium hover:text-blue-600">
                가방
            </Link>
            <Link href="/search/속옷,홈웨어" className="text-gray-700 font-medium hover:text-blue-600">
                속옷/홈웨어
            </Link>
            <Link href="/search/스포츠" className="text-gray-700 font-medium hover:text-blue-600">
                스포츠
            </Link>
        </div>
    );
}
