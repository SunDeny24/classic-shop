//네이버 쇼핑 패션 url 파라미터 조립
// src/lib/services/fashionService.js

import { httpGet } from '../http';

//상품 목록 패칭 함수
export async function fetchFashionProducts(query, options = {}) {
    const url = new URL('/api/naver-fashion', window.location.origin);

    url.searchParams.set('query', query);
    url.searchParams.set('display', options.display ?? '20');
    url.searchParams.set('start', options.start ?? '1');

    return httpGet(url.toString(), {
        cache: 'no-store',
    });
}
