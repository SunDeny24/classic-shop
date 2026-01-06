import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
    return (
        <div className="shrink-0">
            <Link href="/">
                <Image src="/images/Skipick.svg" alt="Skipick" width={130} height={50} loading="eager" />
            </Link>
        </div>
    );
}
