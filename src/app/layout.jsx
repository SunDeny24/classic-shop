//전체 provider 설정 최상위지점
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import TanstackProvider from "@/providers/TanstackProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://my-skipick-project.vercel.app/";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Skipick",
  description: "Skipick 빠른선택을 위한 쇼핑몰",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Google은 `keywords` 메타를 직접 활용하지 않는 편이지만, 기타 검색엔진/도구 호환을 위해 포함
  other: {
    keywords:
      "Skipick, 스킵픽, 빠른선택, 온라인쇼핑몰, 추천상품, 카테고리, 추천영상, 트렌드추천, 장바구니, 쇼핑몰",
  },
  icons: {
    icon: "/images/icon.png",
    apple: "/images/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "Skipick",
    title: "Skipick",
    description: "Skipick 빠른선택을 위한 쇼핑몰",
    url: "/",
    images: [
      {
        url: "/images/Skipick_og.png",
        width: 1200,
        height: 630,
        alt: "Skipick",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skipick",
    description: "Skipick 빠른선택을 위한 쇼핑몰",
    images: ["/images/Skipick_og.png"],
  },
};

// 폰트 최적화 위해 display: "swap" 옵션 추가
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// 폰트 안정화 위해 로컬로 호스팅
const astaSans = localFont({
  src: [
    {
      path: "../fonts/AstaSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/AstaSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-asta-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${montserrat.variable} ${astaSans.variable}`}>
      <body>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
