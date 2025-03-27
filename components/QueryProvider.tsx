"use client";
import StoreProvider from "@/app/StoreProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
type QueryProviderProps = {
  children: React.ReactNode;
};
const QueryProvider = ({ children }: QueryProviderProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        retryDelay: 5000,
        staleTime: 1000 * 60 * 5,
      },
    },
  });

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </StoreProvider>
  );
};
export default QueryProvider;
