// Route Handler (서버 > 네이버쇼핑 호출로 엔드포인트 구현)
// src/app/api/naver-fashion/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || ''; //목록 검색어
    const display = searchParams.get('display') || '20';
    const start = searchParams.get('start') || '1';

    const apiUrl = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(
        query
    )}&display=${display}&start=${start}`;

    const customHeaders = {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
    };

    const res = await fetch(apiUrl, {
        headers: customHeaders,
        cache: 'no-store',
    });

    const data = await res.json();

    return Response.json(data, { status: res.status });
}
