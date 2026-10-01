"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { imgUrl, formatCompact, type Post } from "@/data/projects";
import { useDemo } from "@/lib/demo-store";
import { IconArrow, IconBookmark, IconEye } from "@/components/design-system";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  index,
}: {
  project: Post;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { openPost, toggleSave, isSaved } = useDemo();
  const saved = isSaved(project.id);

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
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="reveal"
      style={{ transitionDelay: `${(index % 6) * 40}ms` }}
    >
      <div
        className="group relative cursor-pointer"
        onClick={() => openPost(project.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && openPost(project.id)}
        aria-label={`Open post by ${project.username}`}
      >
        <div
          className={cn(
            "thumb-zoom relative overflow-hidden bg-cloud",
            "aspect-[3/2] rounded-[1px]",
            index % 3 === 1 && "aspect-[4/5]",
            index % 4 === 0 && "aspect-square",
            index % 5 === 4 && "aspect-[3/3.6]",
            index % 7 === 6 && "aspect-[16/10]"
          )}
        >
          <Image
            src={imgUrl(project.seed, 800, 600)}
            alt={`Post by ${project.username}`}
            fill
            sizes="(max-width:809px) calc((100vw - 38px)/2), (max-width:1199px) calc((100vw - 80px)/3), calc((100vw - 360px)/3)"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* floating save action */}
        <button
          aria-label={saved ? "Unsave post" : "Save post"}
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(project.id);
          }}
          className={cn(
            "absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all",
            saved
              ? "bg-ink text-paper"
              : "bg-white/85 text-ink opacity-100 min-[810px]:opacity-0 min-[810px]:group-hover:opacity-100"
          )}
        >
          <IconBookmark filled={saved} />
        </button>
      </div>

      {/* caption: username + original-post arrow (replaces date) */}
      <div className="flex items-center justify-between gap-2 pt-2">
        <span className="truncate font-mono text-[11px] tracking-[0.02em] text-ink">
          @{project.username}
        </span>
        <span className="flex shrink-0 items-center gap-2.5 font-mono text-[11px] text-fog">
          <span className="hidden items-center gap-1 min-[810px]:flex">
            <IconEye />
            {formatCompact(project.views)}
          </span>
          <a
            href={project.originalLink}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="View original post"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <IconArrow />
          </a>
        </span>
      </div>
    </article>
  );
}
