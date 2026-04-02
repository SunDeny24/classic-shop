// src/lib/http.ts

const DEFAULT_HEADERS: HeadersInit = {
    'Content-Type': 'application/json',
};

interface HttpGetOptions {
    headers?: HeadersInit;
}

export async function httpGet<T>(url: string, options: HttpGetOptions = {}): Promise<T> {
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

    return (await res.json()) as T;
}
