//(main)의 layout지정 파일 - 헤더, 푸터, {children}
import Header from "@/components/layout/Header";
import ScrollToTop from "@/components/layout/ScrollToTop";
import AppProvider from "@/context/AppProvider";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <AppProvider>
      <div>
        <Header />
        {children}
        <ScrollToTop />
      </div>
    </AppProvider>
  );
}
