"use client";

import { useMemo } from "react";
import { useDemo } from "@/lib/demo-store";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { FilterPills, SortPills, AvailabilityDot } from "@/components/design-system";
import { ProjectCard } from "@/components/ProjectCard";
import { PostModal } from "@/components/PostModal";

function Feed() {
  const { visiblePosts, openPost, filter, setFilter, sort, setSort, query, setQuery } =
    useDemo();

  const visible = visiblePosts;

  // Distribute items into 3 columns for desktop/tablet
  const cols3 = useMemo(() => {
    const c1: typeof visible = [];
    const c2: typeof visible = [];
    const c3: typeof visible = [];
    visible.forEach((item, idx) => {
      if (idx % 3 === 0) c1.push(item);
      else if (idx % 3 === 1) c2.push(item);
      else c3.push(item);
    });
    return [c1, c2, c3];
  }, [visible]);

  // Distribute items into 2 columns for mobile
  const cols2 = useMemo(() => {
    const c1: typeof visible = [];
    const c2: typeof visible = [];
    visible.forEach((item, idx) => {
      if (idx % 2 === 0) c1.push(item);
      else c2.push(item);
    });
    return [c1, c2];
  }, [visible]);

  return (
    <>
      <Topbar />
      <Sidebar />

      <div className="min-h-screen min-[1200px]:pl-[300px]">
        {/* Sticky Filter Bar — Hansler layout + Sort + Search */}
        <div className="sticky top-0 z-[10] flex items-center gap-3 border-b border-line bg-glass px-[14px] py-[11px] backdrop-blur-[20px] min-[810px]:px-[22px] min-[810px]:py-[14px] min-[1200px]:px-[30px] min-[1200px]:py-[15px] pt-[72px] min-[1200px]:pt-[15px]">
          <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
            <FilterPills value={filter} onChange={setFilter} />
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists…"
            aria-label="Search artists"
            className="hidden w-[150px] shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-[13px] outline-none placeholder:text-mist focus:border-ink min-[810px]:block"
          />
          <SortPills value={sort} onChange={(v) => setSort(v as "recent" | "popular")} />
        </div>

        {/* Feed Grid - Multi-column masonry matching Hansler */}
        {visible.length === 0 ? (
          <p className="px-5 py-24 text-center font-mono text-[13px] text-[#6b6b6b]">
            {query
              ? `No posts match “${query}” in this category.`
              : "No posts found in this category."}
          </p>
        ) : (
          <main>
            {/* Desktop & Tablet 3-column masonry */}
            <div className="hidden min-[810px]:grid grid-cols-3 gap-[18px] px-[22px] pt-4 pb-24 min-[1200px]:gap-6 min-[1200px]:px-[30px] min-[1200px]:pt-[18px] min-[1200px]:pb-[60px]">
              {cols3.map((col, cIdx) => (
                <div
                  key={`col-3-${cIdx}`}
                  className="flex flex-col gap-[18px] min-[1200px]:gap-6 w-full"
                >
                  {col.map((project, pIdx) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={pIdx * 3 + cIdx}
                      onOpen={(slug) => openPost(project.id)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile 2-column masonry */}
            <div className="grid min-[810px]:hidden grid-cols-2 gap-[10px] px-[14px] pt-3 pb-[100px]">
              {cols2.map((col, cIdx) => (
                <div
                  key={`col-2-${cIdx}`}
                  className="flex flex-col gap-[10px] w-full"
                >
                  {col.map((project, pIdx) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={pIdx * 2 + cIdx}
                      onOpen={(slug) => openPost(project.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </main>
        )}

        {/* Mobile footer matching Framer */}
        <footer className="flex flex-col gap-2 px-[18px] pb-12 pt-6 text-[13px] text-[#6b6b6b] min-[1200px]:hidden">
          <div className="flex items-start gap-2">
            <AvailabilityDot />
            <p>New motion work, curated daily.</p>
          </div>
          <a
            href="mailto:hello@motionvault.studio"
            className="text-ink hover:underline"
          >
            hello@motionvault.studio
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b] pt-1">
            © 2026 Motion Vault · Demo
          </p>
        </footer>
      </div>

      <PostModal />
    </>
  );
}

export default function Home() {
  return <Feed />;
}
