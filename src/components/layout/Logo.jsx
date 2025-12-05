import Link from 'next/link';

export default function Logo() {
    return (
        <div className="text-2xl font-bold text-blue-600">
            <Link href="/">로고</Link>
        </div>
    );
}
