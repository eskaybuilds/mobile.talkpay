import { QueryClient } from '@tanstack/react-query';

// One retry, then the screen shows its error state; a phone on a bad network shouldn't spin for long.
export const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: 1, staleTime: 30_000 },
      mutations: { retry: 0 },
    },
  });
