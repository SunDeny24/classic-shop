declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NAVER
      NAVER_CLIENT_ID?: string;
      NAVER_CLIENT_SECRET?: string;

      // YouTube
      YOUTUBE_API_KEY?: string;

      // Public base URL
      NEXT_PUBLIC_BASE_URL?: string;
      NEXT_PUBLIC_SITE_URL?: string;
    }
  }
}

export {};

