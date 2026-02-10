//전체 provider 설정 최상위지점
import '@/styles/globals.css';
import { Montserrat, Asta_Sans } from 'next/font/google';

export const metadata = {
    title: 'Skipick',
    description: 'Skipick 빠른선택을 위한 쇼핑몰',
};

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

const astaSans = Asta_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-asta-sans',
});

export default function RootLayout({ children }) {
    return (
        <html lang="ko" className={`${montserrat.variable} ${astaSans.variable}`}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* favicon, 추가 head 요소도 여기에 */}
            </head>
            <body>{children}</body>
        </html>
    );
}
