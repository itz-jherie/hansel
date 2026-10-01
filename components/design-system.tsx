import { cn } from "@/lib/cn";
import { sorts } from "@/lib/tokens";
import { categories } from "@/lib/projects";

/* ---------- pills ---------- */
export function Pill({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap rounded-[15px] border px-3 py-[7px] text-[13px] leading-[1.15] tracking-[-0.005em] transition-all duration-200 active:scale-[0.97]",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line-strong bg-transparent text-ink hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}

export function FilterPills<T extends string>({
  value,
  onChange,
}: {
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto">
      {categories.map((c) => (
        <Pill
          key={c.id}
          active={value === c.id}
          onClick={() => onChange(c.id as T)}
        >
          {c.label}
        </Pill>
      ))}
    </div>
  );
}

export function SortPills({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-fog max-[1199px]:hidden">
        Sort
      </span>
      {sorts.map((s) => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          className={cn(
            "whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.05em] transition-all",
            value === s.id
              ? "border-ink bg-ink text-paper"
              : "border-line-strong text-smoke hover:border-ink hover:text-ink"
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

export function YearPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line-strong px-2 py-[3px] font-mono text-[11px] uppercase leading-[1.2] tracking-[0.07em]">
      {children}
    </span>
  );
}

export function CatPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.07em] text-paper">
      {children}
    </span>
  );
}

export function AvailabilityDot() {
  return (
    <span className="mt-[5px] h-2 w-2 shrink-0 animate-pulse-dot rounded-full bg-moss" />
  );
}

/* ---------- modal shell ---------- */
export function Modal({
  open,
  onClose,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[50] flex items-end justify-center bg-black/45 p-0 backdrop-blur-[6px] min-[810px]:items-center min-[810px]:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "relative max-h-[92vh] w-full overflow-y-auto rounded-t-[18px] bg-paper shadow-2xl min-[810px]:rounded-[16px]",
          wide ? "max-w-[880px]" : "max-w-[520px]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/90 backdrop-blur transition-transform hover:scale-105"
        >
          <IconClose />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ---------- form bits ---------- */
export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[12px] text-fog">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-[10px] border border-line-strong bg-white px-3 py-2.5 text-[14px] outline-none transition-colors placeholder:text-mist focus:border-ink";

export function PrimaryBtn({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className="w-full rounded-[12px] bg-ink py-3 text-[14px] font-medium text-paper transition-transform active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

export function GhostBtn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-[12px] border px-4 py-2.5 text-[13px] transition-colors",
        danger
          ? "border-red-300 text-red-600 hover:bg-red-50"
          : "border-line-strong hover:border-ink"
      )}
    >
      {children}
    </button>
  );
}

/* ---------- icons (inline SVG, no deps) ---------- */
const svg = "h-4 w-4 shrink-0";

export const IconBookmark = ({ filled }: { filled?: boolean }) => (
  <svg viewBox="0 0 24 24" className={svg} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);
export const IconArrow = () => (
  <svg viewBox="0 0 24 24" className="block h-[13px] w-[13px] shrink-0 -translate-x-[1px] translate-y-[1px]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="8 7 17 7 17 16" />
  </svg>
);
export const IconEye = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
export const IconClose = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
export const IconIG = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);
export const IconX = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="currentColor">
    <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 18h1.7L7 3.9H5.2L17.8 20z" />
  </svg>
);
export const IconMail = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);
export const IconPlus = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
export const IconCheck = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
export const IconCopy = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);
export const IconExternal = () => (
  <svg viewBox="0 0 24 24" className={svg} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
