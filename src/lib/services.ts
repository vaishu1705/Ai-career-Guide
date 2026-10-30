/**
 * Typed wrappers around every Flask endpoint.
 * Import these in components instead of calling axios directly.
 */
import { auth, request } from "./api";

export interface User { _id: string; name: string; email: string }

export const authApi = {
  register: async (payload: { name: string; email: string; password: string }) => {
    const data = await request<{ token: string; user: User }>("post", "/auth/register", payload);
    auth.setToken(data.token);
    return data;
  },
  login: async (payload: { email: string; password: string }) => {
    const data = await request<{ token: string; user: User }>("post", "/auth/login", payload);
    auth.setToken(data.token);
    return data;
  },
  logout: async () => {
    try { await request("post", "/auth/logout"); } finally { auth.clear(); }
  },
  me: () => request<{ user: User }>("get", "/auth/me"),
};

export const profileApi = {
  get: () => request<Record<string, unknown>>("get", "/profile"),
  update: (payload: Record<string, unknown>) => request<Record<string, unknown>>("put", "/profile", payload),
  getSettings: () => request<Record<string, unknown>>("get", "/settings"),
  updateSettings: (payload: Record<string, unknown>) => request<Record<string, unknown>>("put", "/settings", payload),
};

export const assessmentApi = {
  saveInterests: (interests: { key: string; rating: number }[]) =>
    request<Record<string, unknown>>("post", "/assessment/interests", { interests }),
  getInterests: () => request<Record<string, unknown>>("get", "/assessment/interests"),
  saveSkills: (payload: { answers: unknown[]; difficulty?: string; time_taken?: number }) =>
    request<Record<string, unknown>>("post", "/assessment/skills", payload),
  getSkills: () => request<Record<string, unknown>>("get", "/assessment/skills"),
  skillHistory: () => request<Record<string, unknown>[]>("get", "/assessment/skills/history"),
};

export const predictionApi = {
  predict: (payload: Record<string, unknown> = {}) => request<Record<string, unknown>>("post", "/predict-career", payload),
  latest: () => request<Record<string, unknown>>("get", "/prediction"),
  history: () => request<Record<string, unknown>[]>("get", "/prediction-history"),
};

export const learningApi = {
  roadmap: () => request<Record<string, unknown>>("get", "/learning/roadmap"),
  module: (id: string) => request<Record<string, unknown>>("get", `/learning/module/${id}`),
  completeClass: (id: string) => request("post", `/learning/module/${id}/class`),
  completeNotes: (id: string) => request("post", `/learning/module/${id}/notes`),
  submitTask: (id: string, submission: string) => request("post", `/learning/module/${id}/task`, { submission }),
  submitProject: (id: string, payload: Record<string, unknown>) => request("post", `/learning/module/${id}/project`, payload),
  submitQuiz: (id: string, score: number, answers: unknown[] = []) =>
    request<{ passed: boolean }>("post", `/learning/module/${id}/quiz`, { score, answers }),
  certificate: (id: string) => request<Record<string, unknown>>("post", `/learning/module/${id}/certificate`),
  certificates: () => request<Record<string, unknown>[]>("get", "/learning/certificates"),
  progress: () => request<Record<string, unknown>>("get", "/learning/progress"),
  courses: (params?: { level?: string; q?: string }) =>
    request<Record<string, unknown>[]>("get", "/learning/courses", undefined, params),
  feedback: (id: string, payload: { rating: number; useful: boolean; comment?: string }) =>
    request("post", `/learning/module/${id}/feedback`, payload),
};

export const jobsApi = {
  list: (params?: Record<string, unknown>) => request<Record<string, unknown>[]>("get", "/jobs", undefined, params),
  bookmark: (id: string) => request("post", `/jobs/${id}/bookmark`),
  removeBookmark: (id: string) => request("delete", `/jobs/${id}/bookmark`),
  bookmarks: () => request<Record<string, unknown>[]>("get", "/jobs/bookmarks"),
};

export const internshipsApi = {
  list: (params?: Record<string, unknown>) => request<Record<string, unknown>[]>("get", "/internships", undefined, params),
  bookmark: (id: string) => request("post", `/internships/${id}/bookmark`),
  removeBookmark: (id: string) => request("delete", `/internships/${id}/bookmark`),
  bookmarks: () => request<Record<string, unknown>[]>("get", "/internships/bookmarks"),
};

export const resumeApi = {
  get: () => request<Record<string, unknown>>("get", "/resume"),
  create: (payload: Record<string, unknown>) => request<Record<string, unknown>>("post", "/resume", payload),
  update: (payload: Record<string, unknown>) => request<Record<string, unknown>>("put", "/resume", payload),
  downloadUrl: () => "/api/resume/download",
};

export const dashboardApi = {
  get: () => request<Record<string, unknown>>("get", "/dashboard"),
  weekly: () => request<Record<string, unknown>>("get", "/dashboard/weekly"),
  upcoming: () => request<Record<string, unknown>[]>("get", "/dashboard/upcoming"),
  history: () => request<Record<string, unknown>[]>("get", "/dashboard/history"),
};

export const notificationsApi = {
  list: () => request<Record<string, unknown>[]>("get", "/notifications"),
  create: (payload: { title: string; body?: string; type?: string }) => request("post", "/notifications", payload),
  markRead: (id: string) => request("put", `/notifications/${id}/read`),
  remove: (id: string) => request("delete", `/notifications/${id}`),
  unreadCount: () => request<{ unread: number }>("get", "/notifications/unread-count"),
};
