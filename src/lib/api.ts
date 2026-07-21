import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios';
import type { ApiErrorResponse, ApiResponse } from '@krasidge/shared';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * ApiError normalizes failures (validation, auth, network) into a single shape
 * so components can rely on `message` and optional field-level `errors`.
 */
export class ApiError extends Error {
  public readonly code?: string;
  public readonly errors?: Record<string, string[]>;
  public readonly status?: number;

  constructor(message: string, options?: { code?: string; errors?: Record<string, string[]>; status?: number }) {
    super(message);
    this.name = 'ApiError';
    this.code = options?.code;
    this.errors = options?.errors;
    this.status = options?.status;
  }
}

function toApiError(error: AxiosError<ApiErrorResponse>): ApiError {
  if (error.response?.data) {
    const { message, code, errors } = error.response.data;
    return new ApiError(message || 'Something went wrong', {
      code,
      errors,
      status: error.response.status,
    });
  }
  if (error.code === 'ECONNABORTED') {
    return new ApiError('The request timed out. Please try again.', { code: 'TIMEOUT' });
  }
  if (!error.response) {
    return new ApiError('Unable to reach the server. Check your connection and try again.', {
      code: 'NETWORK_ERROR',
    });
  }
  return new ApiError('Something went wrong', { status: error.response.status });
}

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<void> | null = null;

async function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_URL}/auth/refresh`, null, { withCredentials: true })
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

export type AuthExpiredHandler = () => void;
let onAuthExpired: AuthExpiredHandler | null = null;

export function setAuthExpiredHandler(handler: AuthExpiredHandler | null): void {
  onAuthExpired = handler;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const config = error.config as RetryableConfig | undefined;
    const status = error.response?.status;
    const url = config?.url ?? '';
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh');

    if (status === 401 && config && !config._retry && !isAuthRoute) {
      config._retry = true;
      try {
        await refreshSession();
        return api(config);
      } catch {
        onAuthExpired?.();
        return Promise.reject(toApiError(error));
      }
    }

    return Promise.reject(toApiError(error));
  },
);

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.get<ApiResponse<T>>(url, config);
  return unwrap(data);
}

export async function apiPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.post<ApiResponse<T>>(url, body, config);
  return unwrap(data);
}

export async function apiPatch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.patch<ApiResponse<T>>(url, body, config);
  return unwrap(data);
}

export async function apiPut<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.put<ApiResponse<T>>(url, body, config);
  return unwrap(data);
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await api.delete<ApiResponse<T>>(url, config);
  return unwrap(data);
}

function unwrap<T>(payload: ApiResponse<T>): T {
  if (!payload.success) {
    throw new ApiError(payload.message, { code: payload.code, errors: payload.errors });
  }
  return payload.data;
}

export function getErrorMessage(error: unknown, fallback = 'Something went wrong'): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}
