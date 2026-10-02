"use client";

import { useState } from "react";
import Link from "next/link";
import { useDemo } from "@/lib/demo-store";
import { categories } from "@/lib/tokens";
import { AvailabilityDot, IconArrow } from "@/components/design-system";
import { cn } from "@/lib/cn";

export function Topbar() {
  const [open, setOpen] = useState(false);
  const { user, setAuth, setDash, setSubmit, setAdmin, query, setQuery, filter, setFilter } =
    useDemo();
  const close = () => setOpen(false);

  return (
    <>
      {/* Floating pill navigation — Hansler shell preserved */}
      <header className="fixed left-1/2 top-4 z-30 flex w-[calc(100%-28px)] max-w-[390px] -translate-x-1/2 items-center justify-between rounded-[22px] border border-white/10 bg-[#0a0a0a]/80 px-4 py-2 text-white shadow-[0px_18px_44px_0px_rgba(20,19,15,0.28)] backdrop-blur-[28px] min-[1200px]:hidden">
        <Link
          href="/"
          className="text-[17px] font-medium tracking-[-0.015em] text-white"
        >
          Motion Vault
        </Link>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-[19px] bg-white/15 px-3 py-1 text-[13px] font-normal text-white transition-colors hover:bg-white/25 active:scale-[0.98]"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {/* Stage 1 §5 — Recent-style full mobile menu */}
      {open && (
        <div className="fixed inset-0 z-20 flex flex-col bg-white min-[1200px]:hidden">
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-[90px]">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
                Search artists
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search @username…"
                className="w-full rounded-[12px] border border-line-strong bg-white px-4 py-3 text-[15px] outline-none placeholder:text-mist focus:border-ink"
              />
            </label>

            <nav className="mt-6 flex flex-col gap-1 border-t border-line pt-5">
              <Link
                href="/"
                onClick={close}
                className="py-1.5 text-[24px] font-medium leading-tight tracking-[-0.02em] text-ink"
              >
                Work
              </Link>
              <Link
                href="/about"
                onClick={close}
                className="py-1.5 text-[24px] font-medium leading-tight tracking-[-0.02em] text-[#6b6b6b]"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={close}
                className="py-1.5 text-[24px] font-medium leading-tight tracking-[-0.02em] text-[#6b6b6b]"
              >
                Contact
              </Link>
              <button
                onClick={() => {
                  close();
                  setSubmit(true);
                }}
                className="py-1.5 text-left text-[24px] font-medium leading-tight tracking-[-0.02em] text-[#6b6b6b]"
              >
                Submit a post
              </button>
              {user ? (
                <button
                  onClick={() => {
                    close();
                    setDash(true, "saved");
                  }}
                  className="py-1.5 text-left text-[24px] font-medium leading-tight tracking-[-0.02em] text-[#6b6b6b]"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    close();
                    setAuth(true);
                  }}
                  className="py-1.5 text-left text-[24px] font-medium leading-tight tracking-[-0.02em] text-[#6b6b6b]"
                >
                  Login / Sign Up
                </button>
              )}
              <button
                onClick={() => {
                  close();
                  setAdmin(true);
                }}
                className="py-1.5 text-left font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]"
              >
                Admin
              </button>
            </nav>

            <p className="mb-2 mt-6 font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
              Categories
            </p>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilter(c.id)}
                  className={cn(
                    "rounded-[15px] border px-3 py-[6px] text-[13px] transition-colors",
                    filter === c.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-[#4d4d4d]"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-2 border-t border-line pt-5">
              <AvailabilityDot />
              <p className="text-[14px] leading-[1.45] text-[#6b6b6b]">
                New motion work, curated daily.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-line px-6 pb-10 pt-6">
            <div className="flex flex-col gap-1.5">
              <a
                href="mailto:hello@motionvault.studio"
                className="text-[16px] font-medium text-ink"
              >
                hello@motionvault.studio
              </a>
              <div className="flex items-center gap-4 text-[14px] text-[#6b6b6b]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-ink"
                >
                  Instagram <IconArrow />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-ink"
                >
                  X <IconArrow />
                </a>
                <a
                  href="mailto:hello@motionvault.studio"
                  className="flex items-center gap-1 hover:text-ink"
                >
                  Support <IconArrow />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
              <span>Motion Vault</span>
              <span>© 2026</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
