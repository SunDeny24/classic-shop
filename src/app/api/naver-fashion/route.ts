// src/app/api/naver-fashion/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { FashionResponse } from '@/types/fashion';

export async function GET(request: NextRequest) {
    // 1. URL 파라미터 추출
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const display = searchParams.get('display') || '20';
    const start = searchParams.get('start') || '1';
    const sort = searchParams.get('sort') || 'sim';

    const apiUrl = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
        query,
    )}&display=${display}&start=${start}&sort=${sort}`;

    // 2. 헤더 설정 (환경 변수 타입 체크)
    const customHeaders: HeadersInit = {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID || '',
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET || '',
    };

    try {
        // 3. 네이버 API 호출
        const res = await fetch(apiUrl, {
            headers: customHeaders,
            cache: 'no-store',
        });

        if (!res.ok) {
            return NextResponse.json(
                { message: `Naver API Error (${res.status})` },
                { status: res.status },
            );
        }

        // 네이버가 돌려주는 원본 데이터
        const data: FashionResponse = await res.json();

        // 4. 클라이언트에 그대로 전달
        return NextResponse.json(data);
    } catch (error) {
        console.error('Naver API Error:', error);
        return NextResponse.json({ message: '서버 내부 오류' }, { status: 500 });
    }
}
