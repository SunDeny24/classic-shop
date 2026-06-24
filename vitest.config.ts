import { defineConfig } from "vitest/config";
//import react from "@vitejs/plugin-react";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Node.js가 아닌 브라우저 환경에서 테스트 실행
    environment: "jsdom", // jsdom 설정시 RTL이 dom그릴수 있음
    // 테스트 실행 전 전역 설정 파일 불러오기
    setupFiles: ["./vitest.setup.ts"],
    // describe, it, expect 등을 import 없이 사용
    globals: true,
    alias: {
      // Next.js의 절대 경로 설정과 동일하게 맞춰줍니다.
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
