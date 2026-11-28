import { createQueryClient } from './query-client';

describe('createQueryClient', () => {
  it('retries a failed query once and never retries a mutation', () => {
    const { queries, mutations } = createQueryClient().getDefaultOptions();
    expect(queries?.retry).toBe(1);
    expect(mutations?.retry).toBe(0);
  });

  it('gives each client its own cache', () => {
    expect(createQueryClient().getQueryCache()).not.toBe(createQueryClient().getQueryCache());
  });
});
