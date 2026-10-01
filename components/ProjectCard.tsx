"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

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
    <a
      ref={ref}
      href={`/work/${project.slug}`}
      aria-label={project.title}
      className="reveal block w-full break-inside-avoid"
      style={{ transitionDelay: `${(index % 6) * 40}ms` }}
    >
      <div
        className="thumb-zoom relative w-full overflow-hidden bg-cloud"
        style={{ aspectRatio: String(project.ratio), borderRadius: 5 }}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width:479px) 100vw, (max-width:809px) 50vw, (max-width:1199px) 33vw, 26vw"
          className="object-cover"
        />
      </div>

      {/* caption — title in sans, year in mono (matches the live site) */}
      <div className="mt-[10px] flex items-baseline justify-between gap-3">
        <span className="truncate text-[13px] tracking-[-0.01em] text-ink">
          {project.title}
        </span>
        <span className="shrink-0 font-mono text-[11px] tracking-[0.02em] text-fog">
          {project.year}
        </span>
      </div>
    </a>
  );
}