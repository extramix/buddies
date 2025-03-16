import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  cache?: RequestCache;
  revalidate?: number | false;
};

/**
 * Server-side fetch utility for Next.js server components
 */
export async function serverFetch<T = unknown>(
  endpoint: string,
  cookieStorePromise: Promise<ReadonlyRequestCookies> | ReadonlyRequestCookies,
  options: FetchOptions = {}
): Promise<T> {
  const { method = 'GET', body, cache, revalidate } = options;
  
  const cookieStore = await Promise.resolve(cookieStorePromise);
  
  // If the endpoint starts with http, use it as is, 
  // otherwise use the API_BASE_URL and remove the leading slash
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}/${endpoint.replace(/^\//, '')}`;
  

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Cookie: cookieStore.toString()
  };
  
  const fetchOptions: RequestInit = {
    method,
    headers,
    credentials: 'include',
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(cache ? { cache } : {}),
    ...(revalidate !== undefined ? { next: { revalidate } } : {})
  };
  
  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
} 