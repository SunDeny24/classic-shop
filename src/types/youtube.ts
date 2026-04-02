// src/types/youtube.ts

// 유튜브 API 원본 아이템 모양
export interface YoutubeVideo {
    id: {
        kind: string;
        videoId: string;
    };
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            medium: { url: string };
            high: { url: string };
        };
        channelTitle: string;
        publishedAt: string;
    };
}
// 유튜브 API 전체 응답 모양
export interface YoutubeResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YoutubeVideo[];
}

// 유튜브 훅 가공
export interface CuratedVideo {
    id: string;
    title: string;
    thumbnail: string;
}
