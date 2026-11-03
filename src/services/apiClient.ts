import axios, { AxiosError } from 'axios';
import { env } from '../config/env';
import type { ApiErrorBody, ApiSuccess } from '../types/api';

/** Normalised error thrown by every API call, so UI code never inspects Axios internals. */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(message: string, status: number, code: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (error instanceof AxiosError) {
    if (!error.response) return new ApiError('Unable to reach the server. Check your connection.', 0, 'NETWORK_ERROR');
    const body = error.response.data as ApiErrorBody | undefined;
    if (body?.success === false) {
      return new ApiError(body.error.message, error.response.status, body.error.code, body.error.details);
    }
    return new ApiError(error.message, error.response.status, 'HTTP_ERROR');
  }
  return new ApiError('Something went wrong', 0, 'UNKNOWN_ERROR');
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  // Auth uses HttpOnly cookies, which the browser only sends cross-origin with credentials.
  withCredentials: true,
  timeout: 15_000,
});

apiClient.interceptors.response.use(undefined, (error) => Promise.reject(toApiError(error)));

/** Unwraps the backend's `{ success, data }` envelope. */
export function unwrap<T>(body: ApiSuccess<T>): T {
  return body.data;
}
