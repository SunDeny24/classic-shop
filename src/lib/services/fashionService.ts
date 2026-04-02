// src/lib/services/fashionService.ts

import { httpGet } from '../http';
import { FashionResponse } from '@/types/fashion';

/**
 * 네이버쇼핑 데이터를 가져오는 서비스 함수
 */
export async function fetchFashionProducts(
    query: string,
    options: {
        display?: string;
        start?: string;
        sort?: string;
    } = {},
) {
    const params = new URLSearchParams({
        query,
        display: options.display ?? '20',
        start: options.start ?? '1',
        sort: options.sort ?? 'sim',
    });

    return httpGet<FashionResponse>(`/api/naver-fashion?${params.toString()}`);
}
