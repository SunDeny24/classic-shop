// Route Handler (서버 > 유튜브 호출로 엔드포인트 구현)
// src/app/api/youtube/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || ''; //type
    const query = searchParams.get('query') || ''; //검색어

    const API_KEY = process.env.YOUTUBE_API_KEY;
    const currentYear = new Date().getFullYear();

    //제외키워드들
    const excludeKeywords = ' -뉴스 -news -방송 -예능 -TV -티비';

    let finalQuery = '';

    if (type === 'trend') {
        // 1. 트렌드 영상 query (현재년도 트렌드로 검색)
        finalQuery = `${currentYear} 트렌드${excludeKeywords}`;
    } else {
        // 2. 키워드 검색 query
        finalQuery = `${query} 리뷰 추천${excludeKeywords}`;
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
        const data = await res.json();
        if (!res.ok) {
            return Response.json({ error: data.error }, { status: res.status });
        }
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: '서버 내부 오류' }, { status: 500 });
    }
}
