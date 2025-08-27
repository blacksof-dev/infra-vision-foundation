"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getFetch } from "@/lib/api";

type UseApiHookProps = {
  url: string;
  cacheKey: string;
};

export function useApiHook<T>({
  url,
  cacheKey,
}: UseApiHookProps): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: [cacheKey],
    queryFn: () => getFetch<T>(url),
    staleTime: 1000 * 60 * 60 * 24, 
     gcTime: 1000 * 60 * 60 * 24,
       refetchOnMount: false,
    
  });
}
