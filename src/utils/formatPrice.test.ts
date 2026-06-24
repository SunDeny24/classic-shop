// 숫자를 천단위 포맷으로 변환하는 함수 테스트
import formatPrice from "./formatPrice";
import { describe, it, expect } from "vitest";

describe("formatPrice 테스트", () => {
  it("숫자형 가격을 콤마가 포함된 문자열로 변환한다", () => {
    expect(formatPrice(25000)).toBe("25,000");
  });
  it("0원 입력시 [0원] 으로 반환한다.", () => {
    expect(formatPrice(0)).toBe("0");
  });
});
