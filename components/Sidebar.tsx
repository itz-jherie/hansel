import Image from "next/image";
import { YearPill, AvailabilityDot, IconIG } from "./design-system";

const linkCls =
  "w-fit py-1 text-[15px] leading-[1.2] tracking-[-0.01em] text-smoke transition-colors duration-200 hover:text-ink";

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-10 hidden h-screen w-[300px] flex-col gap-[26px] overflow-y-auto border-r border-line bg-glass px-7 pb-7 pt-9 backdrop-blur-[22px] min-[1200px]:flex">
      <div>
        <a href="/" aria-label="Hansler" className="block w-fit">
          <Image
            src="/avatar.jpg"
            alt="Hansler"
            width={56}
            height={56}
            className="h-14 w-14 rounded-[14px] bg-cloud object-cover grayscale"
          />
        </a>
        <div className="mt-[18px] flex items-center gap-2.5">
          <a
            href="/"
            className="text-[19px] font-medium leading-[1.3] tracking-[-0.015em]"
          >
            Hansler
          </a>
          <YearPill>2026</YearPill>
        </div>
        <p className="mt-2 text-[13px] leading-[1.45] tracking-[-0.02em] text-fog">
          Independent designer
        </p>
        <p className="mt-1 max-w-[230px] text-[13px] leading-[1.45] tracking-[-0.02em] text-fog">
          Working across identity, digital and image. A handful of projects a
          year.
        </p>
      </div>

      <nav className="flex flex-col gap-[2px]">
        <a href="/" className={`${linkCls} text-ink`}>
          Work
        </a>
        <a href="/about" className={linkCls}>
          About
        </a>
        <a href="/contact" className={linkCls}>
          Contact
        </a>
      </nav>

      <div className="flex-1" />

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <AvailabilityDot />
          <p className="text-[13px] leading-[1.45] text-smoke">
            Available for selected projects.
          </p>
        </div>
        <a
          href="mailto:hello@hansler.studio"
          className="w-fit text-[13px] leading-[1.45] tracking-[-0.02em] text-smoke transition-colors hover:text-ink"
        >
          hello@hansler.studio
        </a>
        <div className="mt-1 flex items-center gap-4 text-[13px] text-fog">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            Instagram
          </a>
          <span className="opacity-60">·</span>
          <a
            href="https://are.na"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-ink"
          >
            Are.na
          </a>
        </div>
        <div className="my-[10px] h-px bg-line" />
        <div className="text-[13px] leading-[1.5] text-fog">
          <p>Copenhagen</p>
          <p>55°41′ N 12°34′ E</p>
          <p className="mt-2">© 2026</p>
        </div>
      </div>
    </aside>
  );
}