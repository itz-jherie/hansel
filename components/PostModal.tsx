"use client";

import Image from "next/image";
import { useDemo } from "@/lib/demo-store";
import { formatCompact } from "@/data/projects";
import { categories } from "@/lib/tokens";
import {
  IconBookmark,
  IconExternal,
  IconEye,
  IconIG,
  Modal,
} from "@/components/design-system";
import { cn } from "@/lib/cn";

export function PostModal() {
  const { activePost, closePost, isSaved, toggleSave } = useDemo();
  if (!activePost) return null;

  const uname = (activePost.username || activePost.title || "artist").trim();
  const handle = uname.startsWith("@") ? uname : `@${uname}`;
  const saved = isSaved(activePost.id);

  const catLabel =
    categories.find((c) => c.id === activePost.category)?.label ??
    activePost.category;

  return (
    <Modal open wide onClose={closePost}>
      <div className="grid min-[810px]:grid-cols-[1.1fr_1fr]">
        {/* Media */}
        <div className="relative min-h-[300px] bg-[#f0f0f0] min-[810px]:min-h-[520px]">
          {activePost.video ? (
            <video
              src={activePost.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={activePost.image || "https://picsum.photos/seed/motion-vault/800/600"}
              alt={activePost.alt || handle}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </div>

        {/* Stage 1 §3 — popup: username, views, Save, View Original Post */}
        <div className="flex flex-col justify-between p-6 min-[810px]:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
              <span>{catLabel}</span>
              <span>·</span>
              <span>{activePost.year}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cloud text-smoke">
                <IconIG />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-[20px] font-medium leading-[1.2] tracking-[-0.02em] text-ink">
                  {handle}
                </h2>
                <p className="font-mono text-[11px] text-fog">
                  instagram.com/{uname.replace(/^@/, "")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[13px] text-smoke">
              <span className="flex items-center gap-1.5">
                <IconEye />
                {formatCompact(activePost.views)} views
              </span>
              <span aria-label={`${activePost.likes} likes`}>
                ♥ {formatCompact(activePost.likes)}
              </span>
            </div>

            <div className="flex flex-col gap-2 border-t border-line pt-4">
              <button
                onClick={() => toggleSave(activePost.id)}
                aria-pressed={saved}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-[12px] py-3 text-[14px] font-medium transition-all active:scale-[0.98]",
                  saved
                    ? "bg-ink text-paper"
                    : "border border-line-strong hover:border-ink"
                )}
              >
                <IconBookmark filled={saved} />
                {saved ? "Saved" : "Save Post"}
              </button>
              <a
                href={activePost.originalLink || "#"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-[12px] bg-ink py-3 text-[14px] font-medium text-paper transition-transform active:scale-[0.98]"
              >
                <IconExternal />
                View Original Post
              </a>
              <p className="font-mono text-[11px] leading-relaxed text-fog">
                DEMO — opens the link the artist submitted.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
              Motion Vault · demo
            </p>
            <button
              onClick={closePost}
              className="text-[13px] text-[#6b6b6b] hover:text-ink"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
