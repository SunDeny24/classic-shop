//유튜브 api url 파라미터 조립
//유튜브 영상을 가져오는 서비스함수
// src/lib/services/youtubeService.js

import { httpGet } from '../http';

export async function fetchYoutubeService(type, query, options = {}) {
    const url = new URL('/api/youtube', window.location.origin);

    url.searchParams.set('type', type);

    if (query) {
        url.searchParams.set('query', query);
    }

    return httpGet(url.toString());
}
