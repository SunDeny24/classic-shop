/** @type {import('next').NextConfig} */

//CSP(Content Security Policy) 헤더는 src/middleware.ts 에서 관리
//CSP는 nonce와 함께 동적으로 주입되므로 next.config.mjs에 추가하면 nonce 방어가 무력화됨

const nextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: true, // 개발모드 빌드중 켜기
  },
  images: {
    qualities: [60, 75], //이미지 압축품질 지정으로 용량 최적화
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shopping-phinf.pstatic.net", //네이버 쇼핑
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com", //유튜브 섬네일
        pathname: "/**",
      },
    ],
  },

  // 모든 경로에 대해 보안 헤더를 설정하는 함수
  // Next.js는 이 함수를 호출하여 각 요청에 대해 지정된 헤더를 응답에 포함시킵니다.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          }, //클릭재킹 방어 : 다른 사이트에서 내 페이지를 iframe으로 불러오는 것을 방지
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          }, //MIME 타입 스니핑 방어 : 악성 스크립트 파일을 실행하지 않도록 브라우저에게 MIME 타입을 강제로 지정
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          }, //개인정보 보호 : 외부 링크로 이동할 때 referrer 정보(사이트 상세주소경로) 제한
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          }, //권한 제한 : 악성 코드 주입되어도 카메라, 마이크, 위치 정보 접근 불가하도록 설정
        ],
      },
    ];
  },
};

export default nextConfig;
