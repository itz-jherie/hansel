"use client";
import { useDemo } from "@/lib/demo-store";

export function Toasts() {
  const { toasts } = useDemo();
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-[min(420px,calc(100vw-32px))] -translate-x-1/2 flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="rounded-[12px] bg-ink px-4 py-3 text-center text-[13px] text-paper shadow-xl"
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
