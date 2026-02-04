//(main)의 layout지정 파일 - 헤더, 푸터, {children}
import Header from '@/components/layout/Header';
import ScrollToTop from '@/components/layout/ScrollToTop';
import AppProvider from '@/context/AppProvider';

export default function MainLayout({ children }) {
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
