"use client";
import Image from "next/image";
import { useDemo } from "@/lib/demo-store";
import { formatCompact, imgUrl } from "@/data/projects";
import { categories } from "@/lib/tokens";
import {
  CatPill,
  GhostBtn,
  IconBookmark,
  IconCopy,
  IconExternal,
  IconEye,
  Modal,
} from "@/components/design-system";

export function PostModal() {
  const { activePost, closePost, toggleSave, isSaved, copy } = useDemo();
  if (!activePost) return null;
  const saved = isSaved(activePost.id);
  const catLabel =
    categories.find((c) => c.id === activePost.category)?.label ??
    activePost.category;

  return (
    <Modal open wide onClose={closePost}>
      <div className="grid min-[810px]:grid-cols-[1.2fr_1fr]">
        <div className="relative min-h-[260px] bg-cloud min-[810px]:min-h-[480px]">
          <Image
            src={imgUrl(activePost.seed, 1000, 800)}
            alt={`Post by ${activePost.username}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 p-5 min-[810px]:p-7">
          <CatPill>{catLabel}</CatPill>
          <div>
            <p className="text-[22px] font-medium tracking-[-0.02em]">
              @{activePost.username}
            </p>
            <a
              href={`https://instagram.com/${activePost.username}`}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-fog underline-offset-2 hover:underline"
            >
              instagram.com/{activePost.username}
            </a>
          </div>

          <div className="flex items-center gap-4 font-mono text-[12px] text-fog">
            <span className="flex items-center gap-1.5">
              <IconEye /> {formatCompact(activePost.views)} views
            </span>
            <span>♥ {formatCompact(activePost.likes)}</span>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <a
              href={activePost.originalLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-[12px] bg-ink py-3 text-[14px] font-medium text-paper"
            >
              <IconExternal /> View Original Post
            </a>
            <div className="flex gap-2">
              <button
                onClick={() => toggleSave(activePost.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-[12px] border py-2.5 text-[13px] transition-colors ${
                  saved
                    ? "border-ink bg-ink text-paper"
                    : "border-line-strong hover:border-ink"
                }`}
              >
                <IconBookmark filled={saved} />
                {saved ? "Saved" : "Save Post"}
              </button>
              <GhostBtn onClick={() => copy(activePost.originalLink)}>
                <span className="flex items-center gap-1.5">
                  <IconCopy /> Copy
                </span>
              </GhostBtn>
            </div>
          </div>

          <p className="mt-auto font-mono text-[11px] leading-relaxed text-fog">
            DEMO — impressions count on open, saving prompts login for visitors,
            original link opens the artist post.
          </p>
        </div>
      </div>
    </Modal>
  );
}
