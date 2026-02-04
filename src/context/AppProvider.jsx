//app의 상태관리 Context provider
'use client';

import ShoppingProvider from './ShoppingContext';

export default function AppProvider({ children }) {
    return <ShoppingProvider>{children}</ShoppingProvider>;
}
