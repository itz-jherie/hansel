"use client";
import { useMemo, useState } from "react";
import { DemoProvider, useDemo } from "@/lib/demo-store";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { FilterPills, SortPills, AvailabilityDot } from "@/components/design-system";
import { ProjectCard } from "@/components/ProjectCard";
import { PostModal } from "@/components/PostModal";
import { AuthModal, SubmitModal } from "@/components/AuthModals";
import { Dashboard } from "@/components/Dashboard";
import { Admin } from "@/components/Admin";
import { Toasts } from "@/components/Toasts";
import type { SortMode } from "@/lib/tokens";

function Feed() {
  const { posts } = useDemo();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("recent");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = filter === "all" ? [...posts] : posts.filter((p) => p.category === filter);
    if (q) list = list.filter((p) => p.username.toLowerCase().includes(q));
    list.sort((a, b) =>
      sort === "popular" ? b.views - a.views : b.createdAt - a.createdAt
    );
    return list;
  }, [posts, filter, sort, query]);

  return (
    <>
      <Topbar query={query} onQuery={setQuery} />
      <Sidebar />

      <div className="min-h-screen min-[1200px]:pl-[300px]">
        <div className="pt-[86px] min-[1200px]:pt-0">
          {/* demo banner for the client */}
          <div className="border-b border-line bg-cloud/60 px-5 py-2.5 text-center font-mono text-[11px] tracking-[0.02em] text-smoke min-[810px]:px-[30px] min-[810px]:text-left">
            CLIENT DEMO PREVIEW — mock data, no backend yet. Try: save a post, submit, dashboard, admin.
          </div>

          {/* Filter bar — sticky glass */}
          <div className="sticky top-0 z-[4] flex flex-col gap-2 border-b border-line bg-glass px-5 py-3 backdrop-blur-[20px] min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between min-[810px]:px-[22px] min-[1200px]:px-[30px] max-[809px]:mx-[14px] max-[809px]:rounded-[12px] max-[809px]:border max-[809px]:top-[72px]">
            <FilterPills value={filter} onChange={setFilter} />
            <SortPills value={sort} onChange={(v) => setSort(v as SortMode)} />
          </div>

          {/* desktop search */}
          <div className="hidden px-[30px] pt-4 min-[1200px]:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artists…"
              className="w-[280px] rounded-[10px] border border-line bg-white px-3 py-2 text-[13px] outline-none placeholder:text-mist focus:border-ink"
            />
          </div>

          {/* Feed */}
          {visible.length === 0 ? (
            <p className="px-5 py-16 text-center text-[14px] text-fog min-[810px]:px-[30px]">
              No posts match — try another category or search.
            </p>
          ) : (
            <main className="grid grid-cols-2 gap-[10px] p-3 pb-10 min-[810px]:grid-cols-3 min-[810px]:gap-[18px] min-[810px]:px-[22px] min-[810px]:py-4 min-[810px]:pb-24 min-[1200px]:gap-6 min-[1200px]:px-[30px] min-[1200px]:pb-[60px] min-[1200px]:pt-[18px]">
              {visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </main>
          )}

          {/* Mobile footer */}
          <footer className="flex-col gap-1.5 px-[18px] pb-12 text-[13px] text-smoke flex min-[810px]:hidden">
            <div className="flex items-start gap-2">
              <AvailabilityDot />
              <p>Open for artist submissions.</p>
            </div>
            <a href="mailto:hello@motionvault.studio">hello@motionvault.studio</a>
            <p className="text-fog">© 2026 Motion Vault</p>
          </footer>
        </div>
      </div>

      <PostModal />
      <AuthModal />
      <SubmitModal />
      <Dashboard />
      <Admin />
      <Toasts />
    </>
  );
}

export default function Home() {
  return (
    <DemoProvider>
      <Feed />
    </DemoProvider>
  );
}
