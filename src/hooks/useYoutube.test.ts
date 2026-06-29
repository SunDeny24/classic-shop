// useYoutube.ts 테스트
// - 데이터 로딩 성공시 hook이 목록을 알맞게 반환하는지 검증
// - 입력에 따른 출력 예상가능성 확인을 위함

import { renderHookWithQuery } from "@/test/test-utils";
import { useYoutube } from "./useYoutube";
import * as youtubeService from "@/lib/services/youtubeService"; //모킹을 위해 전체 가져오기
import { vi, describe, it, expect } from "vitest";
import { YoutubeResponse } from "@/types/youtube";

// 서비스 함수 모킹
vi.mock("@/lib/services/youtubeService");

describe("useYoutube훅 테스트", () => {
  it("데이터 로딩이 성공하면 비디오 목록을 반환한다.", async () => {
    const mockVideos: YoutubeResponse = {
      kind: "youtube#searchListResponse",
      etag: "etag",
      pageInfo: { totalResults: 1, resultsPerPage: 1 },
      items: [
        {
          id: { kind: "youtube#video", videoId: "123" },
          snippet: {
            title: "나이키 영상",
            description: "설명",
            thumbnails: {
              medium: { url: "test.jpg" },
              high: { url: "test.jpg" },
            },
            channelTitle: "채널",
            publishedAt: "2026-01-01",
          },
        },
      ],
    };

    // 성공시 모킹된 데이터를 반환하도록 설정
    vi.mocked(youtubeService.fetchYoutubeService).mockResolvedValue(mockVideos);

    // 나이키 추천검색어로 훅 실행
    const { result } = renderHookWithQuery(() =>
      useYoutube("search", "나이키"),
    );

    //비동기로 데이터 로딩 완료 기다림
    await vi.waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 반환된 데이터 검증하기
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data![0]).toEqual({
      id: "123",
      title: "나이키 영상",
      thumbnail: "test.jpg",
    });
  });
});
