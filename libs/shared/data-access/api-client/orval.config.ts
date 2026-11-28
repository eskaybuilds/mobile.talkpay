import { defineConfig } from 'orval';

// The spec comes from the API this environment talks to. No localhost fallback: a silent default would regenerate
// the client against the wrong backend and the drift check would call it clean.
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error('EXPO_PUBLIC_API_URL is not set. Run `npm run api:generate`, which loads .env.development.');
}

export default defineConfig({
  talkpay: {
    input: { target: `${apiUrl.replace(/\/+$/, '')}/docs/openapi.json` },
    output: {
      clean: true,
      mode: 'tags-split',
      target: 'src/generated/endpoints.ts',
      schemas: 'src/generated/model',
      client: 'react-query',
      httpClient: 'fetch',
      override: {
        mutator: { path: 'src/lib/mutator.ts', name: 'apiFetch' },
        // The mutator throws on non-2xx, so callers get the body itself rather than a { data, status } wrapper.
        fetch: { includeHttpResponseReturnType: false },
      },
    },
  },
});
