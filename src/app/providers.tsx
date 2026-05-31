"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div>{children}</div>
      <Toaster richColors />
    </QueryClientProvider>
  );
}
