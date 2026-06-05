// src/middleware.ts

/**
 * Next.js 15 App Router CSP nonce 미들웨어
 * - 요청마다 무작위 nounce를 생성하여 CSP 헤더와 응답 헤더 모두에 주입함
 * - layout.tsx의 <Script> 컴포넌트가 이 nonce를 읽어 인라인 스크립트를 실행합니다.
 * */

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 암호학적으로 안전한 무작위 nonce 생성 (요청마다 새로운 값)
  const uuid = crypto.randomUUID();
  const nonce = btoa(uuid);

  const cspHeader = [
    "default-src 'self'", // 기본적으로 자기 자신만 리소스 로드 허용
    // unsafe-inline → nonce 방식으로 교체됨
    // Next.js 내부 번들 및 YouTube iframe API 초기화 스크립트만 허용
    `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com`,
    "style-src 'self' 'unsafe-inline'", // CSS-in-JS 방식은 nonce 미지원이므로 unsafe-inline 유지
    "img-src 'self' blob: data: https://shopping-phinf.pstatic.net https://i.ytimg.com https://yt3.ggpht.com",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
    // noembed.com: Plyr이 YouTube 제목 fetch에 내부적으로 사용
    // www.youtube.com: YouTube IFrame API가 페이지 컨텍스트에서 YouTube 서버와 통신할 때 필요
    "connect-src 'self' https://shopping-phinf.pstatic.net https://noembed.com https://www.youtube.com",
  ].join("; ");

  // 응답 헤더에 nonce 값을 별도로 노출시키기 → layout.tsx의 headers()에서 읽어 <Script nonce>에 주입
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

export const config = {
  matcher: [
    // 정적 파일, 이미지 최적화 경로, favicon은 미들웨어 적용 제외
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
