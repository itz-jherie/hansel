"use client";

import Image from "next/image";
import Link from "next/link";
import { useDemo } from "@/lib/demo-store";
import { AvailabilityDot, IconArrow } from "./design-system";

export function Sidebar() {
  const { user, setAuth, setDash, setSubmit, setAdmin } = useDemo();

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-10 hidden h-screen w-[300px] flex-col justify-between overflow-y-auto border-r border-line bg-glass px-7 pb-7 pt-9 backdrop-blur-[22px] min-[1200px]:flex">
      {/* Identity — Hansler layout preserved */}
      <div>
        <Link href="/" aria-label="Motion Vault home" className="block w-fit">
          <Image
            src="https://picsum.photos/seed/motion-vault-mark/112/112"
            alt="Motion Vault"
            width={56}
            height={56}
            className="h-14 w-14 rounded-[14px] object-cover grayscale transition-transform duration-300 hover:scale-[1.02]"
          />
        </Link>
        <div className="mt-[18px] flex items-center gap-2.5">
          <Link
            href="/"
            className="text-[19px] font-medium leading-[1.3] tracking-[-0.015em] text-ink"
          >
            Motion Vault
          </Link>
          <span className="rounded-full border border-line-strong px-2 py-[3px] font-mono text-[11px] uppercase leading-[1.2] tracking-[0.07em] text-ink">
            2026
          </span>
        </div>
        {/* Stage 1 §4 — short about text */}
        <p className="mt-2 text-[13px] leading-[1.45] tracking-[-0.02em] text-[#6b6b6b]">
          A curated feed for motion designers — 3D, 2D, VFX and renders, saved
          and shared daily.
        </p>

        {/* Navigation — Hansler type scale preserved */}
        <nav className="mt-6 flex flex-col gap-[2px]">
          <Link
            href="/"
            className="w-fit py-1 text-[15px] font-medium leading-[1.2] tracking-[-0.01em] text-ink transition-colors hover:text-ink"
          >
            Work
          </Link>
          <Link
            href="/about"
            className="w-fit py-1 text-[15px] leading-[1.2] tracking-[-0.01em] text-[#6b6b6b] transition-colors hover:text-ink"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="w-fit py-1 text-[15px] leading-[1.2] tracking-[-0.01em] text-[#6b6b6b] transition-colors hover:text-ink"
          >
            Contact
          </Link>
          <button
            onClick={() => setSubmit(true)}
            className="w-fit py-1 text-left text-[15px] leading-[1.2] tracking-[-0.01em] text-[#6b6b6b] transition-colors hover:text-ink"
          >
            Submit a post
          </button>
          {/* Stage 1 §4 — Login / Sign Up + Dashboard entry */}
          {user ? (
            <button
              onClick={() => setDash(true, "saved")}
              className="w-fit py-1 text-left text-[15px] leading-[1.2] tracking-[-0.01em] text-[#6b6b6b] transition-colors hover:text-ink"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => setAuth(true)}
              className="w-fit py-1 text-left text-[15px] leading-[1.2] tracking-[-0.01em] text-[#6b6b6b] transition-colors hover:text-ink"
            >
              Login / Sign Up
            </button>
          )}
          {/* Admin entry (demo CMS) */}
          <button
            onClick={() => setAdmin(true)}
            className="w-fit py-1 text-left font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b] transition-colors hover:text-ink"
          >
            Admin
          </button>
        </nav>
      </div>

      {/* Footer — Stage 1 §4: copyright, socials, contact */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-2">
          <AvailabilityDot />
          <p className="text-[13px] leading-[1.45] tracking-[-0.02em] text-[#6b6b6b]">
            New motion work, curated daily.
          </p>
        </div>

        <div className="h-px w-full bg-line" />

        <div className="flex flex-col gap-1.5">
          {/* Support / Contact → Gmail */}
          <a
            href="mailto:hello@motionvault.studio"
            className="text-[15px] leading-[1.2] tracking-[-0.01em] text-ink hover:underline"
          >
            hello@motionvault.studio
          </a>
          <div className="flex items-center gap-3 pt-1 text-[13px] text-[#6b6b6b]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-ink"
            >
              Instagram <IconArrow />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 transition-colors hover:text-ink"
            >
              X <IconArrow />
            </a>
            <a
              href="mailto:hello@motionvault.studio"
              className="flex items-center gap-1 transition-colors hover:text-ink"
            >
              Support <IconArrow />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-0.5 font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
          <p>© 2026 Motion Vault</p>
          <p>Demo — mock data, no backend</p>
        </div>
      </div>
    </aside>
  );
}
