// 공통 fetch 유틸 : 공통 헤더 설정, 에러처리 담당 재사용
// src/lib/http.js

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
};

export async function httpGet(url, options = {}) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            ...DEFAULT_HEADERS,
            ...(options.headers || {}),
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`[${res.status}] ${text}`);
    }
    return res.json();
}
