"use client";
import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import { useDemo } from "@/lib/demo-store";
import { imgUrl } from "@/data/projects";
import { categories, type Category } from "@/lib/tokens";
import {
  Field,
  GhostBtn,
  IconCheck,
  IconClose,
  IconCopy,
  IconExternal,
  IconPlus,
  Modal,
  PrimaryBtn,
  inputCls,
} from "@/components/design-system";
import { cn } from "@/lib/cn";

export function Admin() {
  const d = useDemo();
  const { adminOpen, setAdmin, pending, posts, usernames } = d;
  const [tab, setTab] = useState<"pending" | "published" | "create">("pending");
  const [reviewId, setReviewId] = useState<string | null>(null);
  const [uname, setUname] = useState("");
  const [link, setLink] = useState("");
  const [cat, setCat] = useState<Category>("3d-motion");

  const review = useMemo(
    () => pending.find((p) => p.id === reviewId) ?? null,
    [pending, reviewId]
  );

  const suggestions = useMemo(() => {
    const q = uname.trim().replace(/^@/, "").toLowerCase();
    if (!q) return [];
    return usernames.filter((u) => u.toLowerCase().includes(q) && u.toLowerCase() !== q).slice(0, 5);
  }, [uname, usernames]);

  if (!adminOpen) return null;

  const create = (e: FormEvent) => {
    e.preventDefault();
    if (!uname.trim() || !link.trim()) {
      d.toast("Enter artist username and post link");
      return;
    }
    d.adminCreate({ username: uname, link, category: cat });
    setUname("");
    setLink("");
    setTab("published");
  };

  return (
    <Modal open wide onClose={() => { setAdmin(false); setReviewId(null); }}>
      <div className="p-5 min-[810px]:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
          Admin · CMS demo
        </p>
        <h2 className="mt-1 text-[24px] font-medium tracking-[-0.02em]">
          Review submissions
        </h2>

        <div className="mt-4 flex gap-1.5">
          {(["pending", "published", "create"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-[13px] capitalize transition-colors",
                tab === t ? "border-ink bg-ink text-paper" : "border-line-strong hover:border-ink"
              )}
            >
              {t === "pending" ? `Pending (${pending.length})` : t === "published" ? `Published (${posts.length})` : "+ Create post"}
            </button>
          ))}
        </div>

        {tab === "pending" && (
          <div className="mt-4">
            {review ? (
              <div className="rounded-[12px] border border-line p-4">
                <div className="flex flex-col gap-4 min-[810px]:flex-row">
                  <Image src={imgUrl(review.seed, 500, 400)} alt="" width={320} height={240} className="h-44 w-full rounded-[8px] object-cover min-[810px]:w-56" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-medium">@{review.username}</p>
                    <p className="mt-0.5 font-mono text-[12px] text-fog">{review.category} · Draft/Pending</p>
                    <p className="mt-2 truncate font-mono text-[12px]">{review.originalLink}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a href={review.originalLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-[10px] border border-line-strong px-3 py-2 text-[13px] hover:border-ink">
                        <IconExternal /> Open submission
                      </a>
                      <GhostBtn onClick={() => d.copy(review.originalLink)}>
                        <span className="flex items-center gap-1.5"><IconCopy /> Copy link</span>
                      </GhostBtn>
                    </div>
                    <div className="mt-3 rounded-[10px] border border-dashed border-line-strong p-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-fog">Upload content (admin only)</p>
                      <p className="mt-1 text-[13px] text-fog">Demo placeholder — users never see this. Full uploads come later.</p>
                      <button onClick={() => d.toast("Upload is admin-only in this stage (demo)")} className="mt-2 rounded-[10px] bg-cloud px-3 py-2 text-[13px]">
                        Upload file…
                      </button>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { d.approve(review.id); setReviewId(null); }} className="flex items-center gap-1.5 rounded-[10px] bg-ink px-4 py-2.5 text-[13px] font-medium text-paper">
                        <IconCheck /> Approve
                      </button>
                      <button onClick={() => { d.reject(review.id); setReviewId(null); }} className="flex items-center gap-1.5 rounded-[10px] border border-red-300 px-4 py-2.5 text-[13px] text-red-600">
                        <IconClose /> Reject
                      </button>
                      <GhostBtn onClick={() => setReviewId(null)}>Back</GhostBtn>
                    </div>
                  </div>
                </div>
              </div>
            ) : pending.length === 0 ? (
              <p className="mt-2 text-[14px] text-fog">Queue is empty — submit a post from the homepage to see it here.</p>
            ) : (
              <div className="mt-2 flex flex-col gap-2">
                {pending.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-[12px] border border-line p-3">
                    <Image src={imgUrl(p.seed, 160, 160)} alt="" width={48} height={48} className="h-12 w-12 rounded-[8px] object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium">@{p.username}</p>
                      <p className="truncate font-mono text-[11px] text-fog">{p.category} · {p.originalLink}</p>
                    </div>
                    <span className="hidden rounded-full bg-cloud px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-smoke min-[810px]:block">Pending</span>
                    <button onClick={() => setReviewId(p.id)} className="rounded-[10px] border border-line-strong px-3 py-2 text-[13px] hover:border-ink">Open</button>
                    <button onClick={() => d.copy(p.originalLink)} aria-label="Copy link" className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-line-strong hover:border-ink"><IconCopy /></button>
                    <button onClick={() => d.approve(p.id)} aria-label="Approve" className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-ink text-paper"><IconCheck /></button>
                    <button onClick={() => d.reject(p.id)} aria-label="Reject" className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-red-300 text-red-600"><IconClose /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "published" && (
          <div className="mt-4 grid grid-cols-2 gap-3 min-[810px]:grid-cols-4">
            {posts.slice(0, 12).map((p) => (
              <div key={p.id} className="overflow-hidden rounded-[8px] border border-line">
                <Image src={imgUrl(p.seed, 300, 300)} alt="" width={300} height={300} className="aspect-square w-full object-cover" />
                <p className="truncate px-2 py-1.5 font-mono text-[11px]">@{p.username}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "create" && (
          <form onSubmit={create} className="mt-4 flex max-w-[480px] flex-col gap-4">
            <Field label="Artist username" hint="Start typing — previous artists are suggested.">
              <div className="relative">
                <div className="flex items-center overflow-hidden rounded-[10px] border border-line-strong focus-within:border-ink">
                  <span className="bg-cloud px-3 py-2.5 font-mono text-[13px] text-fog">instagram.com/</span>
                  <input value={uname} onChange={(e) => setUname(e.target.value)} placeholder="john_doe" className="w-full bg-white px-2 py-2.5 text-[14px] outline-none" />
                </div>
                {suggestions.length > 0 && (
                  <div className="absolute inset-x-0 top-full z-10 mt-1 overflow-hidden rounded-[10px] border border-line bg-white shadow-lg">
                    {suggestions.map((s) => (
                      <button type="button" key={s} onClick={() => setUname(s)} className="block w-full px-3 py-2 text-left font-mono text-[13px] hover:bg-cloud">
                        instagram.com/{s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>
            <Field label="Post link">
              <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://instagram.com/p/…" className={inputCls} />
            </Field>
            <Field label="Category">
              <div className="flex flex-wrap gap-2">
                {categories.filter((c) => c.id !== "all").map((c) => (
                  <button type="button" key={c.id} onClick={() => setCat(c.id as Category)} className={cn("rounded-full border px-3 py-1.5 text-[13px]", cat === c.id ? "border-ink bg-ink text-paper" : "border-line-strong")}>
                    {c.label}
                  </button>
                ))}
              </div>
            </Field>
            <PrimaryBtn type="submit">
              <span className="flex items-center justify-center gap-1.5"><IconPlus /> Publish post</span>
            </PrimaryBtn>
            <p className="font-mono text-[11px] leading-relaxed text-fog">
              Posts attach to the Instagram username — if the artist signs up later with the same name, the posts auto-link to their account.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
}
