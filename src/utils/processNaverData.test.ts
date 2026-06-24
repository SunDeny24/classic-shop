// 네이버 쇼핑 API 응답 데이터 가공 테스트

import { FashionProduct } from "@/types/fashion";
import processNaverData from "./processNaverData";
import { it, expect, describe } from "vitest";

describe("processNaverData 테스트", () => {
  it("HTML 태그 포함된 상품명은 제거하고, 데이터를 올바르게 가공해야 한다.", () => {
    // mock 데이터 생성
    const mockItems: Partial<FashionProduct>[] = [
      {
        productId: "123",
        title: "<b>나이키</b> 에어포스",
        image: "test.jpg",
        lprice: "10000",
        brand: "NIKE",
        link: "http://test.com",
        productType: "1",
      },
    ];

    // 결과 확인
    const result = processNaverData(mockItems as FashionProduct[], "운동화");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("나이키 에어포스");
    expect(result[0].lprice).toBe("10,000");
    expect(result[0].keyword).toBe("운동화");
  });

  it("동일한 productId가 있으면 최저가가 낮은 상품의 정보로 갱신한다", () => {
    const mockItems: Partial<FashionProduct>[] = [
      {
        productId: "1",
        title: "상품1",
        image: "img",
        lprice: "20000",
        link: "link1",
        brand: "B1",
      },
      {
        productId: "1",
        title: "상품2",
        image: "img",
        lprice: "10000",
        link: "link2",
        brand: "B2",
      },
    ];
    // 결과확인
    const result = processNaverData(mockItems as FashionProduct[], "테스트");
    expect(result[0].rawPrice).toBe(10000);
    expect(result[0].lprice).toBe("10,000");
    expect(result[0].link).toBe("link2");
  });

  it("필수 데이터(productId, price, title, image)가 없는 상품은 결과에서 제외해야 한다", () => {
    const mockItems: Partial<FashionProduct>[] = [
      { productId: "", title: "없음", image: "i", lprice: "1000", link: "l" }, // id 없음
      { productId: "2", title: "정상", image: "i", lprice: "1000", link: "l" }, // 정상
    ];

    const result = processNaverData(mockItems as FashionProduct[], "키워드");

    expect(result).toHaveLength(1);
    expect(result[0].productId).toBe("2");
  });
});
