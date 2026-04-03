//유튜브 영상 페칭 커스텀 훅
//src/hooks/useYoutube.ts

'use client';

import { useEffect, useState } from 'react';
import { fetchYoutubeService } from '@/lib/services/youtubeService';
import { CuratedVideo, YoutubeVideo } from '@/types/youtube';

export function useYoutube(type: string, query?: string) {
    const [videos, setvideos] = useState<CuratedVideo[]>([]); //영상들 state
    const [loading, setLoading] = useState<boolean>(true); //로딩여부 state
    const [error, setError] = useState<string | null>(null); //에러 state

    const load = async () => {
        if (!type) return;

        // type - trend(쿼리없을 경우) : search(쿼리가 있을경우)
        setvideos([]);
        setLoading(true);
        setError(null);
        try {
            const data = await fetchYoutubeService(type, query);

            //console.log('검색 타입:', type, '응답 데이터:', data);
            if (data.items && data.items.length > 0) {
                const formattedVideo: CuratedVideo[] = data.items.slice(0, 4).map((item: YoutubeVideo) => ({
                    id: typeof item.id === 'string' ? item.id : item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                }));
                setvideos(formattedVideo);
            }
        } catch (e: any) {
            setError(e.message ?? '유튜브 데이터 가져오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (type) load();
    }, [query, type]);
    return { videos, loading, error };
}
