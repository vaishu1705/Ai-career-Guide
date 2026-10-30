import axios, { type AxiosInstance } from "axios";

/**
 * Single Axios client for the Flask REST API.
 * Set VITE_API_URL to your Flask server (e.g. http://localhost:5000).
 */
export const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:5000";

const TOKEN_KEY = "acg:token";

export const auth = {
  get token() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};

export const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

api.interceptors.request.use((config) => {
  const token = auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      auth.clear();
    }
    const message =
      error.response?.data?.message ?? error.message ?? "Network error";
    return Promise.reject(new Error(message));
  },
);

/** Unwraps the Flask `{ success, message, data }` envelope. */
export async function request<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: unknown,
  params?: Record<string, unknown>,
): Promise<T> {
  const res = await api.request<ApiEnvelope<T>>({ method, url, data: body, params });
  if (!res.data?.success) throw new Error(res.data?.message ?? "Request failed");
  return res.data.data;
}
