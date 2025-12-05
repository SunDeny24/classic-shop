//네이버 쇼핑 패션
// src/app/lib/fashionService.js

import { httpGet } from '../http';

//데이터 fetch정보 반환
export async function fetchFashionProducts(query, options = {}) {
    const url = new URL('/api/naver-fashion', window.location.origin);
    console.log('url : ', url);
    url.searchParams.set('query', query);
    url.searchParams.set('display', options.display ?? '20');
    url.searchParams.set('start', options.start ?? '1');

    return httpGet(url.toString(), {
        cache: 'no-store',
    });
}
