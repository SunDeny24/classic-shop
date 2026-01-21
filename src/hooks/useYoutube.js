//유튜브 영상 페칭 커스텀 훅
//src/hooks/useYoutube.js
'use client';

import { useEffect, useState } from 'react';
import { fetchYoutubeService } from '@/lib/services/youtubeService';

export function useYoutube(type, query) {
    const [videos, setvideos] = useState([]); //영상들 state
    const [loading, setLoading] = useState(true); //로딩여부 state
    const [error, setError] = useState(null); //에러 state
    const load = async () => {
        const activeType = !query && type === 'search' ? 'trend' : type;
        // console.log('[useYoutube]activeType : ', activeType);
        // console.log('[useYoutube]query : ', query);

        setLoading(true);
        setError(null);
        try {
            const data = await fetchYoutubeService(activeType, query);
            //console.log('검색 타입:', type, '응답 데이터:', data);
            if (data.items && data.items.length > 0) {
                const formattedVideo = data.items.map((item) => ({
                    id: typeof item.id === 'string' ? item.id : item.id.videoId,
                    title: item.snippet.title,
                    thumbnail: item.snippet.thumbnails.medium.url,
                }));
                setvideos(formattedVideo);
            }
        } catch (e) {
            console.log('[useYoutube]e : ', e);
            setError(e.message ?? '유튜브 데이터 가져오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        //  if (!query) return;
        load();
    }, [query]);
    return { videos, loading, error };
}
