// 유튜브 데이터를 가져오는 서비스 함수 테스트

import { vi, expect, it, describe, afterEach } from "vitest";
import { fetchYoutubeService } from "./youtubeService";
import * as http from "@/lib/http";

//http 모듈 전체 모킹
vi.mock("@/lib/http", () => ({
  httpGet: vi.fn(),
}));

describe("youtubeService 테스트", () => {
  // 테스트시 모킹 초기화해주기
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("type이 [trend]일 때 query 없이 올바르게 호출해야 한다", async () => {
    const mockData = { items: [] };
    vi.mocked(http.httpGet).mockResolvedValue(mockData);

    await fetchYoutubeService("trend");

    // URLSearchParams가 type=trend로 호출되었는지 확인
    expect(http.httpGet).toHaveBeenCalledWith(
      expect.stringContaining("type=trend"),
    );

    //query가 URL에 포함되지 않았는지 확인
    expect(http.httpGet).not.toHaveBeenCalledWith(
      expect.stringContaining("query="),
    );
  });

  it("type이 search고 query가 있으면 파라미터가 모두 포함되어야한다.", async () => {
    vi.mocked(http.httpGet).mockResolvedValue({ items: [] });

    await fetchYoutubeService("search", "나이키");
    // type, query 인코딩 됐는지 확인
    const exepctURLPart = "type=search&query=%EB%82%98%EC%9D%B4%ED%82%A4"; //나이키 포함 쿼리
    expect(http.httpGet).toHaveBeenCalledWith(
      expect.stringContaining(exepctURLPart),
    );
  });

  it("API 호출 중 에러가 발생하면 에러를 던져야 한다", async () => {
    // 1. mockResolvedValue 대신 mockRejectedValue를 사용하여 실패 상황을 모킹
    vi.mocked(http.httpGet).mockRejectedValue(new Error("API Error"));

    // 2. 에러가 정확히 발생하는지 검증
    await expect(fetchYoutubeService("trend")).rejects.toThrow("API Error");
  });
});
