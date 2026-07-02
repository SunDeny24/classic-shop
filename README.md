#  Skipick

**네이버 쇼핑 & YouTube API 기반 개인 맞춤형 쇼핑 큐레이션 플랫폼**

사용자의 검색 기록과 최근 조회 상품을 분석하여 관련 상품과 YouTube 콘텐츠를 추천하는 Next.js 기반 프로젝트입니다.

기존 프로젝트를 TypeScript 기반으로 리팩토링하고 TanStack Query, Zustand, 테스트 환경 구축, 성능 최적화 및 보안 강화를 통해 서비스 구조를 개선했습니다.

---

##  프로젝트 정보
- **배포 주소**: [https://my-skipick-project.vercel.app/](https://my-skipick-project.vercel.app/)
- **개발 기간**: 
  - 2025.11.20 ~ 2026.03.05 (초기 개발)
  - 2026.04.02 ~ 2026.07.02 (리팩토링)
- **주요 목적**:
  - **API 연동을 통한 실시간 데이터 처리**: Naver/YouTube API 데이터를 활용한 개인 맞춤형 쇼핑 큐레이션 서비스 구현
  - **서버 상태 및 전역 상태 관리 개선**: TanStack Query와 Zustand를 적용하여 데이터 캐싱 및 상태 관리 구조 개선
  - **TypeScript 기반 리팩토링**: 프로젝트 전반 TS 마이그레이션을 통해 타입 안정성 확보
  - **사용자 경험(UX) 향상**: 무한 스크롤, Skeleton UI, 반응형 UI 및 로딩 경험 개선
  - **서비스 품질 향상**: 테스트 코드 작성, 성능 최적화 및 보안 강화

---

##  사용 기술
- **Framework**: `Next.js 15+ (App Router)`, `React 19`
- **Language**: `TypeScript`
- **Styling**: `Tailwind CSS 4`
- **State Management**: `Zustand`
- **Data Fetching & Caching**: `TanStack Query`, custom Hooks (`useProducts`, `useYoutube`)
- **Libraries**: `Plyr` (커스텀 비디오 플레이어)
- **API**: `Naver Search API`, `YouTube Data API v3`
- **Testing**: `Vitest`, `React Testing Library`, `Playwright`

---

##  핵심 구현 사항
### 쇼핑 서비스

- 네이버 쇼핑 API 기반 **상품 탐색 및 필터링 시스템 구현**
- 검색 키워드와 최근 조회 상품 기반 **개인화 추천 로직 개발**
- **TanStack Query 기반 무한 스크롤 및 데이터 캐싱 구현**
- YouTube 영상 자동 큐레이션 기능 구현

### 상태 관리

- **Zustand 기반 장바구니 / 위시리스트 전역 상태 관리**
- TanStack Query 기반 서버 상태 캐싱 및 상세페이지 데이터 관리

### 사용자 경험(UX)

- Skeleton UI 및 반응형 디자인 구현
- 하이브리드 무한스크롤 적용
- 공유 기능 UX 개선
- 로딩 및 에러 처리 개선

### 성능 최적화

- Next/Image 적용
- 폰트 로딩 최적화(FCP 개선)
- 이미지 플리커링 개선
- 불필요한 렌더링 최소화(useMemo)

### 보안

- CSP Nonce 기반 보안 정책 적용
- XSS 방지를 위한 URL Validation
- 외부 API 데이터 HTML Sanitizing
- Runtime Type Guard 적용

### 테스트

- Store Unit Test
- Hook Unit Test
- Service Layer Test
- Utility Test
- Component Test
- Playwright E2E Test

---

##  Project Structure


```text
src/
├── app/                 # App Router
│   ├── (main)/          # 메인 레이아웃
│   ├── product/[id]/    # 상품 상세
│   ├── search/[query]/  # 검색 결과
│   └── api/             # API Route
├── components/          # UI 및 기능 컴포넌트
├── hooks/               # Custom Hooks
├── store/               # Zustand Store
├── lib/                 # API 서비스 및 공통 fetch
├── types/               # 공통 타입 정의
├── utils/               # 유틸리티
├── middleware.ts        # CSP 보안 미들웨어
└── tests/               # 테스트 코드
```
---

##  실행 방법

```text
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev
```


---

##  상세 개발 일지

| 기간                   | 주요 작업 내용 |
|----------------------|----------------|
| **2025.11**          | 프로젝트 초기 설계 및 **Next.js App Router 구조 구축**, 기본 레이아웃 컴포넌트 제작 |
| **2025.12**          | **네이버 쇼핑 API 연동** 및 서비스 레이어 구축, 커스텀 훅 `useProducts` 기반 데이터 페칭 구현 |
| **2026.01**          | **YouTube API 연동**, 최근 본 상품 / 추천 검색어 기반 **큐레이션 로직 구현**, Skeleton UI 적용 |
| **2026.02**          | `useContext` 기반 **장바구니 / 위시리스트 전역 상태 관리 시스템 구축**, 전역 **팝업 알림 시스템 개발** |
| **2026.03**          | **반응형 UI/UX 고도화**, 에러 페이지 및 예외 처리 구현, **서비스 최종 배포** |
| **2026.04 ~ 2026.07** | **TypeScript 전환**, **Zustand**, **TanStack Query**, **테스트 환경 구축**, **보안 강화**, **성능 최적화**, **프로젝트 리팩토링 완료** |




