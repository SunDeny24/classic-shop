#  Skipick

**네이버 쇼핑 & YouTube API 기반 개인 맞춤형 쇼핑 큐레이션 플랫폼** 사용자의 활동 로그(검색, 조회)를 분석하여 상품과 관련 영상 콘텐츠를 실시간으로 매칭해주는 Next.js 프로젝트입니다.

---

##  프로젝트 정보
- **배포 주소**: [https://my-skipick-project.vercel.app/](https://my-skipick-project.vercel.app/)
- **개발 기간**: 2025.11.20 ~ 2026.03.05 (약 4개월)
- **주요 목적**: 
    - **API 연동을 통한 실시간 데이터 처리**: Naver/YouTube API 데이터를 가공하여 사용자 맞춤형 정보 제공
    - **useContext를 활용한 전역 상태 관리**: 장바구니, 위시리스트, 공통 팝업 등 서비스 전반의 데이터 일관성 유지
    - **반응형 UI 및 사용자 경험(UX) 구현**: 다양한 디바이스 최적화 및 스켈레톤 UI, 로딩 처리 역량 증명

---

##  사용 기술
- **Framework**: `Next.js 15+ (App Router)`, `React 19`, `JavaScript`
- **Styling**: `Tailwind CSS 4`
- **State Management**: `useContext` (전역 장바구니, 위시리스트, 공통 팝업 관리)
- **Data Fetching**: Custom Hooks (`useProducts`, `useYoutube`), 브라우저 내장 `Fetch API`
- **Libraries**: `Plyr` (커스텀 비디오 플레이어)
- **API**: `Naver Search API`, `YouTube Data API v3`

---

##  핵심 구현 사항

- 네이버 쇼핑 API 기반 **상품 탐색 및 필터링 시스템 구현**
- 검색 키워드와 최근 본 상품을 활용한 **개인화 추천 로직 개발**
- `useContext` 기반 **장바구니 / 위시리스트 전역 상태 관리**
- **Skeleton UI 및 반응형 디자인**을 통한 사용자 경험 최적화
- **API 서비스 레이어 분리 및 컴포넌트 아키텍처 설계**

---

##  Project Structure



```text
src/
├── app/                # App Router (Next.js 15+ 기반 비동기 라우팅)
│   ├── (main)/         # 메인 레이아웃 그룹 (Home, Wishlist, Cart, MyPage)
│   ├── product/[id]/   # 상품 상세 (Dynamic Routes)
│   └── search/[query]/ # 검색 결과 페이지
├── components/         # UI 및 기능별 컴포넌트 (UI, Layout, Pages)
├── context/            # 전역 상태 관리 (ShoppingContext, AppProvider)
├── hooks/              # API 통신 및 비즈니스 로직 커스텀 훅
├── lib/                # API 서비스 레이어 및 공통 fetch 로직 (http.js)
└── utils/              # 데이터 포맷팅 유틸리티 (가격 콤마 표시 등)
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

| 기간 | 주요 작업 내용 |
|-----|----------------|
| 2025.11 | 프로젝트 초기 설계 및 **Next.js App Router 구조 구축**, 기본 레이아웃 컴포넌트 제작 |
| 2025.12 | **네이버 쇼핑 API 연동** 및 서비스 레이어 구축, 커스텀 훅 `useProducts` 기반 데이터 페칭 구현 |
| 2026.01 | **YouTube API 연동**, 최근 본 상품 / 추천 검색어 기반 **큐레이션 로직 구현**, Skeleton UI 적용 |
| 2026.02 | `useContext` 기반 **장바구니 / 위시리스트 전역 상태 관리 시스템 구축**, 전역 **팝업 알림 시스템 개발** |
| 2026.03 | **반응형 UI/UX 고도화**, 에러 페이지 및 예외 처리 구현, **서비스 최종 배포** |




