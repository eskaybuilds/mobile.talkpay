import { ApiError, createApiFetch } from './api-fetch';

const respond = (status: number, body?: unknown) =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

describe('createApiFetch', () => {
  const fetchMock = jest.fn<Promise<Response>, [string, RequestInit?]>();
  const apiFetch = createApiFetch('http://api.test/');

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('joins the base URL and path and returns the parsed body', async () => {
    fetchMock.mockResolvedValue(respond(200, { status: 'ok' }));
    await expect(apiFetch('/health', { method: 'GET' })).resolves.toEqual({ status: 'ok' });
    expect(fetchMock).toHaveBeenCalledWith('http://api.test/health', expect.objectContaining({ method: 'GET' }));
  });

  it('throws an ApiError carrying the status and body on a non-2xx response', async () => {
    fetchMock.mockResolvedValue(respond(503, { status: 'error' }));
    const error = await apiFetch('/health').catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ApiError);
    expect(error).toMatchObject({ status: 503, body: { status: 'error' } });
  });

  it('returns undefined for an empty body', async () => {
    fetchMock.mockResolvedValue(respond(204));
    await expect(apiFetch('/thing', { method: 'DELETE' })).resolves.toBeUndefined();
  });
});
