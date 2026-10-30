import { useEffect, useState } from "react";

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "assessment" | "roadmap" | "job" | "internship" | "system";
}

const KEY = "acg:notifications:v1";
const seed: Notification[] = [
  { id: "n1", kind: "assessment", title: "Assessment completed", body: "Your career prediction is ready — Software Engineer (92% match).", time: "Just now", read: false },
  { id: "n2", kind: "roadmap", title: "New roadmap available", body: "A personalized learning roadmap has been generated for you.", time: "2h ago", read: false },
  { id: "n3", kind: "internship", title: "New internship added", body: "Flipkart SDE Intern — apply before Aug 30.", time: "1d ago", read: false },
  { id: "n4", kind: "job", title: "3 new jobs match your profile", body: "Google, Microsoft and Razorpay are hiring.", time: "3d ago", read: true },
];

function read(): Notification[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) { localStorage.setItem(KEY, JSON.stringify(seed)); return seed; }
    return JSON.parse(raw);
  } catch { return seed; }
}
function write(list: Notification[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("acg:notifications"));
}

export function useNotifications() {
  const [list, setList] = useState<Notification[]>([]);
  useEffect(() => {
    const sync = () => setList(read());
    sync();
    window.addEventListener("acg:notifications", sync);
    return () => window.removeEventListener("acg:notifications", sync);
  }, []);
  const unread = list.filter(n => !n.read).length;
  const markAllRead = () => write(list.map(n => ({ ...n, read: true })));
  const markRead = (id: string) => write(list.map(n => n.id === id ? { ...n, read: true } : n));
  const clear = () => write([]);
  return { list, unread, markAllRead, markRead, clear };
}
