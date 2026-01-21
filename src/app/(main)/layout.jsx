//(main)의 layout지정 파일 - 헤더, 푸터, {children}
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
            <ScrollToTop />
        </div>
    );
}
