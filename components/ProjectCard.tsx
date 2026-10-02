"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Post } from "@/data/projects";
import { useDemo } from "@/lib/demo-store";
import { IconArrow, IconBookmark } from "./design-system";
import { cn } from "@/lib/cn";

function handleUsername(p: Post): string {
  const u = (p.username || p.title || p.slug || "artist").trim();
  return u.startsWith("@") ? u : `@${u}`;
}

export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Post;
  index: number;
  onOpen?: (slug: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isSaved, toggleSave } = useDemo();
  const saved = isSaved(project.id);
  const handle = handleUsername(project);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const open = () => {
    if (onOpen) onOpen(project.slug);
    else window.location.href = `/work/${project.slug}`;
  };

  return (
    <div
      ref={ref}
      className="reveal w-full"
      style={{ transitionDelay: `${(index % 6) * 35}ms` }}
    >
      {/* Outer is a plain div (NOT a Link): the inner "view original"
          arrow is a real <a>, and <a> inside <a> is invalid HTML that
          breaks hydration. The whole card still opens the popup. */}
      {/* Fallback: if JS/reveal fails, cards must still be visible */}
      <noscript>
        <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      <div
        role="link"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
          }
        }}
        className="group flex w-full cursor-pointer flex-col text-left no-underline select-none"
        aria-label={`Open post by ${handle}`}
      >
        {/* Media Container with border-radius 5px and exact aspect ratio */}
        <div
          className="relative w-full overflow-hidden rounded-[5px] bg-[#f0f0f0]"
          style={{ aspectRatio: project.aspectRatio }}
        >
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <Image
              src={project.image || "https://picsum.photos/seed/motion-vault/800/600"}
              alt={project.alt || project.title}
              fill
              sizes="(min-width: 1200px) max((100vw - 360px) / 3, 200px), (min-width: 810px) max((100vw - 80px) / 3, 160px), max((100vw - 38px) / 2, 110px)"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              loading={index < 6 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                const fb = "https://picsum.photos/seed/motion-vault/800/600";
                if (el.src !== fb) el.src = fb;
              }}
            />
          )}

          {/* Stage 1 §2.1 — floating Save action (Hansler tokens, no layout shift) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(project.id);
            }}
            aria-label={saved ? `Unsave ${handle}` : `Save ${handle}`}
            aria-pressed={saved}
            className={cn(
              "absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-[12px] transition-all duration-200 active:scale-95",
              saved
                ? "bg-ink text-paper opacity-100"
                : "bg-glass text-ink opacity-0 hover:bg-paper focus-visible:opacity-100 group-hover:opacity-100 max-[809px]:opacity-100"
            )}
          >
            <IconBookmark filled={saved} />
          </button>
        </div>

        {/* Caption — Stage 1 §2.1: username (not title) + arrow/link icon to original */}
        <div className="flex items-center gap-2.5 px-0.5 pt-2.5 max-[809px]:gap-1.5 max-[809px]:pt-[7px]">
          <p className="min-w-0 flex-1 truncate font-sans text-[13px] leading-[1.45] tracking-[-0.02em] text-[#6b6b6b] transition-colors duration-200 group-hover:text-ink">
            {handle}
          </p>
          <a
            href={project.originalLink || `/work/${project.slug}`}
            target={project.originalLink ? "_blank" : undefined}
            rel={project.originalLink ? "noreferrer" : undefined}
            onClick={(e) => e.stopPropagation()}
            aria-label={`View original post by ${handle}`}
            className="flex shrink-0 items-center text-[#6b6b6b] transition-colors duration-200 hover:text-ink group-hover:text-ink"
          >
            <IconArrow />
          </a>
        </div>
      </div>
    </div>
  );
}
