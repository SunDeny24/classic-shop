//유튜브 영상 페칭 커스텀 훅
//src/hooks/useYoutube.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchYoutubeService } from "@/lib/services/youtubeService";
import { CuratedVideo, YoutubeVideo } from "@/types/youtube";

export function useYoutube(type: string, query?: string) {
  //useQuery 사용
  return useQuery({
    queryKey: ["youtube", type, query],
    queryFn: async () => {
      const data = await fetchYoutubeService(type, query);
      if (data.items && data.items.length > 0) {
        return data.items.slice(0, 4).map((item: YoutubeVideo) => ({
          id: typeof item.id === "string" ? item.id : item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        })) as CuratedVideo[];
      }
      return [];
    },
    enabled: !!type, //type(trend,search)있을 때만 실행함
    staleTime: 1000 * 60 * 60, // 유튜브 추천 영상은 1시간 동안 최신상태 유지
    gcTime: 1000 * 60 * 60 * 24, // 사용하지 않는 데이터는 24시간 동안 보관
  });
}
