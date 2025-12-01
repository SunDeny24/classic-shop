// Route Handler (서버 > 네이버쇼핑 호출로 엔드포인트 구현)
// src/app/api/naver-fashion/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const display = searchParams.get('display') || '20';
    const start = searchParams.get('start') || '1';

    const NAVER_URL = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
        query
    )}&display=${display}&start=${start}`;

    const res = await fetch(NAVER_URL, {
        headers: {
            'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
            'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
        },
        cache: 'no-store',
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
}
