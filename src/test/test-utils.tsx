// hook 테스트 공용 Wrapper

import { renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }, //테스트 실패 시 재시도 방지
  },
});

export function renderHookWithQuery<Props, Result>(
  hook: (props: Props) => Result,
) {
  return renderHook(hook, {
    wrapper: ({ children }: PropsWithChildren) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
}
