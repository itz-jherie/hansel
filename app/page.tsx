"use client";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ProjectCard } from "@/components/ProjectCard";
import { FilterPills } from "@/components/design-system";
import { projects, categories, type Category } from "@/lib/projects";
import { cn } from "@/lib/cn";

export default function Home() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <>
      <Sidebar />

      <div className="min-h-screen min-[1200px]:pl-[300px]">
        {/* Filter bar — the live site's 7 pills */}
        <div className="border-b border-line px-3 py-3 min-[810px]:px-[22px] min-[810px]:py-4 min-[1200px]:px-[30px] min-[1200px]:py-[18px]">
          <FilterPills value={filter} onChange={setFilter} />
        </div>

        {/* Masonry — 3 / 2 / 1 columns, real gap + padding from the live site */}
        <main
          className={cn(
            "columns-1 gap-[10px] px-[14px] pb-[100px] pt-[12px]",
            "min-[810px]:columns-2 min-[810px]:gap-[18px] min-[810px]:px-[22px] min-[810px]:pb-[96px] min-[810px]:pt-[16px]",
            "min-[1200px]:columns-3 min-[1200px]:gap-6 min-[1200px]:px-[30px] min-[1200px]:pb-[60px] min-[1200px]:pt-[18px]"
          )}
        >
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </main>
      </div>
    </>
  );
}