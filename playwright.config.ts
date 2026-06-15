import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // E2E 테스트 파일이 위치할 디렉토리
  testDir: "./e2e",
  // 테스트 병렬 실행 (속도 최적화)
  fullyParallel: true,
  // CI 환경에서는 에러 발생 시 재시도
  retries: process.env.CI ? 2 : 0,

  use: {
    // 테스트 중 이동할 기본 URL
    baseURL: "http://localhost:3000",
    // 실패한 테스트에 한해 원인 분석을 위한 트레이스 수집
    trace: "on-first-retry",
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  // 테스트 실행 전 Next.js 앱 자동 실행
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
