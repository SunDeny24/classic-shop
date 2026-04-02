// src/app/api/youtube/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { YoutubeResponse } from '@/types/youtube';

export async function GET(request: NextRequest) {
    // URL 파라미터 추출
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || ''; //type
    const query = searchParams.get('query') || ''; //검색어

    // 유튜브 API 호출 주소
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const currentYear = new Date().getFullYear();

    // 제외키워드들
    const excludeKeywords = ' -뉴스 -news -방송 -예능 -TV -티비';

    let finalQuery = '';

    if (type === 'trend') {
        // 1. 트렌드 영상 query (현재년도 트렌드로 검색)
        finalQuery = `${currentYear} 트렌드 ${excludeKeywords}`;
    } else {
        // 2. 키워드 검색 query
        finalQuery = `${query} 리뷰 추천 ${excludeKeywords}`;
    }
    const apiUrl =
        `https://www.googleapis.com/youtube/v3/search` +
        `?part=snippet` +
        `&type=video` +
        `&maxResults=4` +
        `&videoEmbeddable=true` +
        `&q=${encodeURIComponent(finalQuery)}` +
        `&key=${API_KEY}`;

    try {
        const res = await fetch(apiUrl, { cache: 'no-store' });

        if (!res.ok) {
            return NextResponse.json({ message: 'Youtube API Error' }, { status: res.status });
        }
        const data: YoutubeResponse = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: '서버 내부 오류' }, { status: 500 });
    }
}
