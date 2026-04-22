// src/lib/services/youtubeService.ts

import { httpGet } from "../http";
import { YoutubeResponse } from "@/types/youtube";

/**
 * 유튜브 영상을 가져오는 서비스 함수
 * @param type - 'trend' 또는 'search'
 * @param query - 검색어 (선택사항)
 * @param pageParam - 유튜브 nextPageToken (TanStack Query에서 전달)
 */
export async function fetchYoutubeService(
  type: string,
  query?: string,
  pageParam?: string,
) {
  const params = new URLSearchParams({
    type,
    ...(query ? { query } : {}),
    ...(pageParam ? { pageToken: pageParam } : {}), // nextPageToken이 있을 때만 pageToken 쿼리스트링 추가
  });

  return httpGet<YoutubeResponse>(`/api/youtube?${params.toString()}`);
}
