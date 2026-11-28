import { appEnv } from '@talkpay/shared/utils/app-env';
import { type ApiError, createApiFetch } from './api-fetch';

export const apiFetch = createApiFetch(appEnv.apiUrl);

// Orval wraps each endpoint's error body in this, so query errors are typed as what apiFetch actually throws.
export type ErrorType<TBody> = ApiError<TBody>;
