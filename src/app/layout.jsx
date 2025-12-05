//전체 provider 설정 최상위지점
import '@/styles/globals.css';

export const metadata = {
    title: 'Shopping In Classic',
    description: '쇼핑몰 프로젝트',
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* favicon, 추가 head 요소도 여기에 */}
            </head>
            <body>{children}</body>
        </html>
    );
}
