// 무한 스크롤 E2E 테스트 코드
import { test, expect } from "@playwright/test";

// 1. 모킹용 가짜 데이터 세팅
// 상품 1개를 만들어내는 헬퍼 함수 - CuratedProduct 전체 가져옴
const createMockItem = (index: number) => ({
  productId: `prod-${index}`,
  title: `테스트 상품 ${index}`,
  link: "https://smartstore.naver.com/main/products/316803251",
  image: "https://shopping-phinf.pstatic.net/main_8756618/8756618747.48.jpg",
  lprice: "15500", // 타입에 맞게 문자열로
  hprice: "",
  mallName: "테스트쇼핑몰",
  brand: "테스트브랜드",
  productType: "1",
  category1: "패션의류",
  category2: "여성의류",
  category3: "티셔츠",
  category4: "",
});

// 1페이지 응답 (start: 1)
const mockPage1 = {
  lastBuildDate: new Date().toISOString(),
  total: 100, // 검색된 총 상품이 100개라고 가정
  start: 1, // 현재 페이지의 시작 위치
  display: 20, // 한 번에 20개씩 보여줌
  items: Array.from({ length: 20 }).map((_, i) => createMockItem(i)),
};

// 2페이지 응답 (start: 21)
const mockPage2 = {
  lastBuildDate: new Date().toISOString(),
  total: 100,
  start: 21, // 두 번째 페이지의 시작 위치
  display: 20,
  items: Array.from({ length: 20 }).map((_, i) => createMockItem(i + 20)),
};

test.describe("검색 페이지 무한 스크롤 E2E 테스트", () => {
  test("스크롤 시 다음 페이지 데이터를 페칭하고 네트워크 중복 호출을 방어해야 한다.", async ({
    page,
  }) => {
    // API가 몇 번 호출되었는지 감시할 카운터
    let apiCallCount = 0;

    // =====================================================================
    // [STEP 1] 네트워크 모킹 (가로채기)
    // 실제 외부 API(네이버 쇼핑 등)로 가는 요청을 Playwright가 중간에서 낚아챕니다.
    // =====================================================================
    await page.route("**/api/naver-fashion**", async (route) => {
      apiCallCount++;
      const url = new URL(route.request().url());

      // fashionService.ts 공식: start = (pageParam-1) * 20 + 1
      // → 1페이지: start=1 / 2페이지: start=21 / 3페이지: start=41 ...
      const startParam = url.searchParams.get("start") || "1";
      console.log(`[API Mock] 호출 #${apiCallCount} → start=${startParam}`);

      // 💡 핵심 로직: 네트워크 지연 시뮬레이션 (0.5초 대기)
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (startParam === "1") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockPage1),
        });
      } else if (startParam === "21") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockPage2),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ items: [], nextPage: null }),
        });
      }
    });

    // =====================================================================
    // [STEP 2] 검색 페이지 진입 및 1페이지 렌더링 검증
    // =====================================================================
    await page.goto("/search/테스트"); //검색 페이지 주소로 진입하기

    // UI에 나타난 상품 카드의 개수를 셉니다. (실제 프로젝트의 상품 카드 class나 id로 수정하세요)
    const productCards = page.getByTestId("product-card");

    // 처음에 모킹한 20개의 데이터가 잘 렌더링되었는지 기다리며 확인합니다.
    await expect(productCards).toHaveCount(20);
    // 이 시점까지 API는 당연히 딱 1번만 불렸어야 합니다.
    expect(apiCallCount).toBe(1);

    // =====================================================================
    // [STEP 3] 스크롤 시뮬레이션 (무한 스크롤 트리거) 및 중복 호출 방어 검증
    // =====================================================================

    // Fix #2: scrollIntoViewIfNeeded() → window.scrollTo()
    // Fix #3: for 루프를 page2ResponsePromise 완료 이전으로 이동
    //
    // 핵심 원리:
    //   - 첫 스크롤로 IntersectionObserver 트리거 → loadMore() 호출 → API call #2 시작 (500ms delay)
    //   - 500ms delay "도중" (isFetchingNextPage=true 상태)에 3번 더 스크롤
    //   - isFetchingNextPage=true 이므로 TanStack Query가 중복 호출을 차단 (이것이 검증 대상!)
    //   - for 루프를 page2ResponsePromise "이후"에 두면 fetch가 이미 완료된 상태라
    //     정상적으로 page 3이 트리거되어 apiCallCount=3이 됨 (← 이전 실패 원인)

    // 2페이지 API 응답 Promise를 미리 등록 (먼저 등록해야 race condition 방지)
    const page2ResponsePromise = page.waitForResponse(
      (resp) =>
        resp.url().includes("/api/naver-fashion") &&
        resp.url().includes("start=21"),
      { timeout: 8000 },
    );

    // [SCROLL 1] 첫 스크롤 → IntersectionObserver 트리거 → loadMore() → API call #2 시작
    //            mock 에서 500ms delay가 걸리므로, 이 시점부터 isFetchingNextPage=true
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" }),
    );

    // ⭐ [중복 호출 방어 검증] 500ms delay 안에서 3번 연속 스크롤
    //    isFetchingNextPage=true 상태이므로 TanStack Query가 추가 API 호출을 차단해야 함
    //    80ms × 3 = 240ms < 500ms (API delay) → 아직 fetch 진행 중
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(80);
      await page.evaluate(() =>
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant",
        }),
      );
    }

    // 2페이지 응답 완료까지 대기 (네트워크 이벤트 기반, 타임아웃 추측 불필요)
    await page2ResponsePromise;

    // React 리렌더링 대기 (이후 추가 스크롤 없음 → page 3 트리거 없음)
    await page.waitForTimeout(500);

    // =====================================================================
    // [STEP 4] 최종 단언 (Assertion)
    // =====================================================================

    // Intersection Observer가 감지되어 2페이지 데이터를 잘 이어 붙였는지 확인합니다. (10개 + 10개 = 20개)
    // 네트워크 딜레이(0.5초)를 주었으므로 넉넉하게 기다려줍니다.
    await expect(productCards).toHaveCount(40, { timeout: 3000 });

    // 💡 가장 중요한 검증:
    // 바닥으로 스크롤을 3번이나 연속으로 쳤지만, TanStack Query가 Lock을 걸어주었기 때문에
    // 실제 API 호출 카운트는 1페이지(1번) + 2페이지(1번) = '정확히 2번'이어야 합니다!
    expect(apiCallCount).toBe(2);
  });
});
