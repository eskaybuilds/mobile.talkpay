export class ApiError<TBody = unknown> extends Error {
  constructor(
    readonly status: number,
    readonly body: TBody,
  ) {
    super(`API request failed with ${status}`);
    this.name = 'ApiError';
  }
}

const parse = async (response: Response): Promise<unknown> => {
  const text = await response.text();
  if (!text) return undefined;
  return response.headers.get('content-type')?.includes('application/json') ? JSON.parse(text) : text;
};

// Pure so it can be tested without the app environment; mutator.ts binds it to appEnv.apiUrl.
export const createApiFetch =
  (baseUrl: string) =>
  async <T>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(`${baseUrl.replace(/\/+$/, '')}${path}`, {
      ...init,
      headers: { Accept: 'application/json', ...init?.headers },
    });
    const body = await parse(response);
    if (!response.ok) throw new ApiError(response.status, body);
    return body as T;
  };
