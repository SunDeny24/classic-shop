//app의 상태관리 Context provider
"use client";

import React from "react"; // React 임포트 추가
import { useRouter } from "next/navigation";
import { useShoppingStore } from "@/store/useShoppingStore";
import PopupMessage from "@/components/layout/PopupMessage";

/* Global 팝업 */
function GlobalPopUp() {
  const showPopup = useShoppingStore((state) => state.showPopup);
  const setShowPopup = useShoppingStore((state) => state.setShowPopup);
  const popupConfig = useShoppingStore((state) => state.popupConfig);

  const router = useRouter();
  // targetPath가 없을 경우를 대비한 기본값 설정
  const targetPage = popupConfig?.targetPath || "/cart";

  if (!showPopup) return null;

  const handleConfirm = () => {
    //const targetPage = popupConfig?.targetPath || '/cart';
    router.push(targetPage);
    setShowPopup(false);
  };

  return (
    <PopupMessage
      isOpen={showPopup}
      title={popupConfig?.title}
      message={popupConfig?.message}
      confirmText={popupConfig?.type === "LIMIT" ? "정리하러 가기" : "이동하기"}
      cancelText="쇼핑 계속하기"
      onConfirm={handleConfirm}
      onCancel={() => setShowPopup(false)}
    />
  );
}

interface AppProviderProps {
  children: React.ReactNode;
}
export default function AppProvider({ children }: AppProviderProps) {
  return (
    <>
      {children}
      <GlobalPopUp />
    </>
  );
}
