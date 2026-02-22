//app의 상태관리 Context provider
'use client';

import { useRouter } from 'next/navigation';
import ShoppingProvider, { useShopping } from './ShoppingContext';
import PopupMessage from '@/components/layout/PopupMessage';

/* Global 팝업 */
function GlobalPopUp() {
    const { showPopup, setShowPopup, popupConfig } = useShopping();
    const router = useRouter();
    const targetPage = popupConfig?.targetPath || '/cart';

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
            confirmText={popupConfig?.type === 'LIMIT' ? '정리하러 가기' : '이동하기'}
            cancelText="쇼핑 계속하기"
            onConfirm={handleConfirm}
            onCancel={() => setShowPopup(false)}
        />
    );
}

export default function AppProvider({ children }) {
    return (
        <ShoppingProvider>
            {children}
            <GlobalPopUp />
        </ShoppingProvider>
    );
}
