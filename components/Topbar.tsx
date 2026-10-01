"use client";
import { useState } from "react";
import Image from "next/image";
import { useDemo } from "@/lib/demo-store";
import { categories } from "@/lib/tokens";
import { IconIG, IconMail } from "@/components/design-system";
import { cn } from "@/lib/cn";

export function Topbar({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { user, setAuth, setDash, setSubmit, setAdmin, pending } = useDemo();

  const go = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  return (
    <>
      <header className="fixed left-1/2 top-4 z-20 flex h-[54px] w-[min(420px,calc(100vw-28px))] -translate-x-1/2 items-center justify-between rounded-[13px] border border-line bg-glass-strong py-0 pl-[18px] pr-2 backdrop-blur-[20px] min-[1200px]:hidden">
        <a href="./" className="text-[17px] font-medium tracking-[-0.015em]">
          Motion Vault
        </a>
        <span className="flex items-center gap-2">
          {user && (
            <button onClick={() => setDash(true, "saved")} aria-label="Dashboard">
              <Image
                src={user.avatar}
                alt={user.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            </button>
          )}
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-[38px] w-[38px] flex-col items-center justify-center gap-[5px] rounded-[9px] border border-line bg-white"
          >
            <span
              className={cn(
                "block h-[1.5px] w-4 bg-ink transition-all",
                open && "translate-y-[3.2px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-4 bg-ink transition-all",
                open && "-translate-y-[3.2px] -rotate-45"
              )}
            />
          </button>
        </span>
      </header>

      {/* Recent-style full menu */}
      <div
        className={cn(
          "fixed inset-0 z-[15] hidden flex-col overflow-y-auto bg-white/95 px-6 pb-8 pt-[92px] backdrop-blur-[22px] min-[1200px]:hidden",
          open && "flex"
        )}
      >
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search artists…"
          className="w-full rounded-[12px] border border-line-strong bg-white px-4 py-3 text-[15px] outline-none placeholder:text-mist focus:border-ink"
        />

        <nav className="mt-5 flex flex-col">
          {[
            { label: "Home", fn: () => {} },
            { label: "Submit post", fn: () => setSubmit(true) },
            user
              ? { label: "Dashboard", fn: () => setDash(true, "saved") }
              : { label: "Login / Sign Up", fn: () => setAuth(true) },
            { label: `Admin demo${pending.length ? ` (${pending.length})` : ""}`, fn: () => setAdmin(true) },
          ].map((l) => (
            <button
              key={l.label}
              onClick={go(l.fn)}
              className="border-b border-line py-3 text-left text-[26px] leading-[1.1] tracking-[-0.02em] text-ink"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <p className="mb-2 mt-6 font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
          Categories
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span
              key={c.id}
              className="rounded-full border border-line-strong px-3 py-1.5 text-[13px]"
            >
              {c.label}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
          >
            <IconIG />
          </a>
          <a
            href="mailto:hello@motionvault.studio"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
          >
            <IconMail />
          </a>
          <p className="ml-2 text-[13px] text-fog">© 2026 Motion Vault</p>
        </div>
      </div>
    </>
  );
}
