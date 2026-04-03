// src/lib/services/youtubeService.ts

import { httpGet } from '../http';
import { YoutubeResponse } from '@/types/youtube';

/**
 * 유튜브 영상을 가져오는 서비스 함수
 */
export async function fetchYoutubeService(type: string, query?: string) {
    const params = new URLSearchParams({
        type,
        ...(query ? { query } : {}),
    });

    return httpGet<YoutubeResponse>(`/api/youtube?${params.toString()}`);
}
