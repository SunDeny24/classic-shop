// 네이버쇼핑 데이터를 가져오는 서비스 함수 테스트

import { vi, expect, it, describe } from "vitest";
import { fetchFashionProducts } from "./fashionService";
import * as http from "@/lib/http";

//http 모듈 전체 모킹
vi.mock("@/lib/http", () => ({
  httpGet: vi.fn(),
}));

describe("fashionService 테스트", () => {
  it("API 호출시 올바른 파라미터 전달한다.", async () => {
    const mockData = { items: [] };
    vi.mocked(http.httpGet).mockResolvedValue(mockData);

    const result = await fetchFashionProducts("모자");
    expect(http.httpGet).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it("API 에러 발생 시 에러 던져야 한다.", async () => {
    vi.mocked(http.httpGet).mockRejectedValue(
      new Error("네트워크 에러_테스트중"),
    );

    await expect(fetchFashionProducts("모자")).rejects.toThrow(
      "네트워크 에러_테스트중",
    );
  });
});
