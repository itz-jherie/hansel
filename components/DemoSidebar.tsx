import Image from "next/image";
import { useDemo } from "@/lib/demo-store";
import { AvailabilityDot, IconIG, IconMail, IconPlus, YearPill } from "./design-system";

const linkCls =
  "w-fit py-1 text-[15px] leading-[1.2] tracking-[-0.01em] text-smoke transition-colors duration-200 hover:text-ink";

export function Sidebar() {
  const { user, setAuth, setDash, setSubmit, setAdmin, pending } = useDemo();

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-10 hidden h-screen w-[300px] flex-col gap-[22px] overflow-y-auto border-r border-line bg-glass px-7 pb-7 pt-9 backdrop-blur-[22px] min-[1200px]:flex">
      <div>
        <a href="#" aria-label="About" className="block w-fit">
          <Image
            src="https://picsum.photos/seed/hansler-avatar/112/112"
            alt="Platform"
            width={56}
            height={56}
            className="h-14 w-14 rounded-[14px] bg-cloud object-cover grayscale"
          />
        </a>
        <div className="mt-[18px] flex items-center gap-2.5">
          <a href="./" className="text-[19px] font-medium leading-[1.3] tracking-[-0.015em]">
            Motion Vault
          </a>
          <YearPill>2026</YearPill>
        </div>
        <p className="mt-2 max-w-[230px] text-[13px] leading-[1.45] tracking-[-0.02em] text-fog">
          A home for motion designers — 3D, 2D, VFX and renders, curated daily.
        </p>
      </div>

      <nav className="flex flex-col gap-[2px]">
        <a href="#" className={`${linkCls} text-ink`}>Work</a>
        <a href="#" className={linkCls}>About</a>
        <a href="mailto:hello@motionvault.studio" className={linkCls}>
          Support / Contact
        </a>
      </nav>

      {/* auth / actions */}
      <div className="flex flex-col gap-2">
        {user ? (
          <>
            <button
              onClick={() => setDash(true, "saved")}
              className="flex items-center gap-2.5 rounded-[12px] border border-line bg-white/70 p-2 text-left transition-colors hover:border-ink"
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate text-[13px] font-medium">{user.name}</span>
                <span className="block truncate text-[12px] text-fog">Open dashboard</span>
              </span>
            </button>
            <button
              onClick={() => setSubmit(true)}
              className="flex items-center justify-center gap-1.5 rounded-[12px] bg-ink py-2.5 text-[13px] font-medium text-paper transition-transform active:scale-[0.98]"
            >
              <IconPlus /> Submit post
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setAuth(true)}
              className="rounded-[12px] bg-ink py-2.5 text-[13px] font-medium text-paper transition-transform active:scale-[0.98]"
            >
              Login / Sign Up
            </button>
            <button
              onClick={() => setSubmit(true)}
              className="flex items-center justify-center gap-1.5 rounded-[12px] border border-line-strong py-2.5 text-[13px] transition-colors hover:border-ink"
            >
              <IconPlus /> Submit post
            </button>
          </>
        )}
      </div>

      <div className="flex-1" />

      {/* client demo shortcuts */}
      <div className="rounded-[12px] border border-dashed border-line-strong p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.07em] text-fog">
          Client demo
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <button
            onClick={() => setDash(true, "saved")}
            className="rounded-full border border-line-strong px-2.5 py-1 text-[12px] hover:border-ink"
          >
            Dashboard
          </button>
          <button
            onClick={() => setAdmin(true)}
            className="relative rounded-full border border-line-strong px-2.5 py-1 text-[12px] hover:border-ink"
          >
            Admin
            {pending.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] text-paper">
                {pending.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <AvailabilityDot />
          <p className="text-[13px] leading-[1.45] text-smoke">
            Open for artist submissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-smoke transition-colors hover:border-ink hover:text-ink"
          >
            <IconIG />
          </a>
          <a
            href="mailto:hello@motionvault.studio"
            aria-label="Email"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-smoke transition-colors hover:border-ink hover:text-ink"
          >
            <IconMail />
          </a>
        </div>
        <div className="my-[6px] h-px bg-line" />
        <div className="text-[13px] leading-[1.5] text-fog">
          <p>© 2026 Motion Vault</p>
          <p className="mt-1">Curated motion inspiration.</p>
        </div>
      </div>
    </aside>
  );
}
