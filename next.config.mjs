/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: true,
  },
  images: {
    qualities: [60, 75], // ProductCard에서 quality={60} 사용 중 → 허용 목록에 등록
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
};

export default nextConfig;
