// SearchModal 컴포넌트 단위 테스트
// - 로컬 스토리지에 최근검색어 없으면 안내 문구 노출되는지 확인
// - 공백 검색시 라우터 막기 확인
// - 정상 검색 로직 확인(로컬 스토리지 저장, 라우팅, 모달 닫기)
// - 최근검색어 개별 삭제시 로컬스토리지, 화면에서 사라지는지 확인
// - 최근검색어 전체 삭제시 로컬스토리지, 화면에서 초기화 되는지 확인

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach } from "vitest";
import SearchModal from "./SearchModal";

// 가짜 라우팅 next/navigation 모듈 모킹
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// 가짜 링크 next/link 모듈 모킹 : a태그로 바꿔 렌더링
interface MockLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
vi.mock("next/link", () => ({
  default: ({ children, href, onClick, className }: MockLinkProps) => (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

describe("SearchModal 컴포넌트 단위 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>; //userEvent 위해 타입 미리 선언
  const mockClose = vi.fn();

  // 초기화 설정
  beforeEach(() => {
    vi.clearAllMocks(); // 스파이 함수 호출 초기화
    localStorage.clear(); // 로컬 스토리지 캐시 초기화
    user = userEvent.setup(); // 가상유저 준비
    // alert가 호출될 때 에러를 방지하기 위해 가짜함수로 모킹
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("로컬 스토리지에 최근 검색어가 없으면 안내 문구를 보여준다", () => {
    render(<SearchModal closeSearch={mockClose} />);
    // 텍스트가 실제 DOM에 있는지 확인(toBeInTheDocument)
    expect(screen.getByText("최근 검색 내역이 없습니다.")).toBeInTheDocument();
  });

  it("공백만 입력하고 제출하면 alert를 띄우고 라우터 이동을 막는다", async () => {
    // 화면에 렌더링
    render(<SearchModal closeSearch={mockClose} />);

    const searchInput = screen.getByPlaceholderText("검색어를 입력하세요");
    // 비동기로 user가 공백 + enter 행동함
    await user.type(searchInput, "   {Enter}");

    // 알람 뜨는지 확인
    expect(window.alert).toHaveBeenCalledWith("검색어를 입력하세요");
    // 라우터 이동 안되는지 확인
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("정상적인 검색어를 입력하면 로컬 스토리지 저장, 라우팅, 모달 닫기가 실행된다", async () => {
    // 화면에 렌더링
    render(<SearchModal closeSearch={mockClose} />);
    const searchInput = screen.getByPlaceholderText("검색어를 입력하세요");
    // 비동기로 검색창에 사용자가 운동화입력후 엔터 행동
    await user.type(searchInput, "운동화{Enter}");

    // 라우팅 되는지 확인
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("/search/"));
    // 모달 닫기 확인
    expect(mockClose).toHaveBeenCalledTimes(1);
    // 로컬 스토리지 최근 검색어에 운동화 들어갔는지 확인
    const saved = JSON.parse(localStorage.getItem("recent_searches") || "[]");
    expect(saved).toEqual(["운동화"]);
  });

  it("개별 삭제 버튼 클릭 시 로컬 스토리지와 화면에서 검색어가 사라진다", async () => {
    // 로컬스토리지에 최근검색어 : 모자, 가방 미리 입력
    localStorage.setItem("recent_searches", JSON.stringify(["모자", "가방"]));
    // 화면에 렌더링
    render(<SearchModal closeSearch={mockClose} />);

    // 모자 렌더링될 때까지 대기
    const hatItem = await screen.findByText("모자");

    // 모자에 가까운 div 찾아 안에 삭제버튼으로 개별 삭제 버튼 찾기
    const hatContainer = hatItem.closest("div"); // '모자' 텍스트를 감싼 div
    const deleteButton = hatContainer?.querySelector("button"); // 그 안의 삭제 버튼

    // 삭제버튼이 있을때 사용자가 삭제하는 행동
    if (deleteButton) {
      await user.click(deleteButton);
    }

    // 비동기 반영될때 까지 waitFor로 대기 -  '모자'가 삭제 됐는지 확인('가방'만 있어야됨)
    await waitFor(() => {
      const saved = JSON.parse(localStorage.getItem("recent_searches") || "[]");
      expect(saved).toEqual(["가방"]);
    });

    // '모자' 삭제됐는지 확인
    expect(screen.queryByText("모자")).not.toBeInTheDocument();
  });

  it("전체삭제 버튼을 누르면 모든 데이터가 초기화된다", async () => {
    // 미리 로컬스토리지에 등록
    localStorage.setItem("recent_searches", JSON.stringify(["양말", "장갑"]));
    // 화면에 렌더링
    render(<SearchModal closeSearch={mockClose} />);

    // 전체삭제 버튼 비동기로 사용자 클릭 행동
    const clearAllButton = await screen.findByText("전체삭제");
    await user.click(clearAllButton);

    // 로컬스토리지 null인지 확인
    expect(localStorage.getItem("recent_searches")).toBeNull();
    // 최근 검색 내역이 없습니다. 멘트 나오는지 확인
    expect(screen.getByText("최근 검색 내역이 없습니다.")).toBeInTheDocument();
  });
});
