"use client";
import { useState, type FormEvent } from "react";
import { useDemo } from "@/lib/demo-store";
import { categories, type Category } from "@/lib/tokens";
import {
  Field,
  GhostBtn,
  Modal,
  PrimaryBtn,
  inputCls,
} from "@/components/design-system";

/* ---------- login / signup (mock Google) ---------- */
export function AuthModal() {
  const { authOpen, setAuth, login } = useDemo();
  return (
    <Modal open={authOpen} onClose={() => setAuth(false)}>
      <div className="p-6 min-[810px]:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
          Join Motion Vault
        </p>
        <h2 className="mt-2 text-[26px] font-medium tracking-[-0.02em]">
          Save work & submit your own.
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-smoke">
          Visitors can browse everything. Saving, submitting and your dashboard
          need an account.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={login}
            className="flex items-center justify-center gap-2 rounded-[12px] border border-line-strong py-3 text-[14px] font-medium transition-colors hover:border-ink"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink font-mono text-[11px] text-paper">
              G
            </span>
            Continue with Google
          </button>
          <GhostBtn onClick={() => setAuth(false)}>Keep browsing</GhostBtn>
        </div>
        <p className="mt-4 font-mono text-[11px] leading-relaxed text-fog">
          DEMO — one click signs you in as “Demo Artist”, no backend yet.
        </p>
      </div>
    </Modal>
  );
}

/* ---------- submit post ---------- */
export function SubmitModal() {
  const { submitOpen, setSubmit, submitPost, user, connectInstagram } = useDemo();
  const [link, setLink] = useState("");
  const [category, setCategory] = useState<Category>("3d-motion");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const effectiveUser = username.trim() || user?.instagram || "";

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!link.trim()) return setError("Paste the link to your post.");
    if (!effectiveUser) return setError("Add your Instagram username.");
    if (user && !user.instagram && username.trim())
      connectInstagram(username.trim());
    setError("");
    submitPost({ link, category, username: effectiveUser });
    setLink("");
    setUsername("");
  };

  return (
    <Modal open={submitOpen} onClose={() => setSubmit(false)}>
      <form onSubmit={send} className="flex flex-col gap-4 p-6 min-[810px]:p-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-fog">
            Submit post
          </p>
          <h2 className="mt-1 text-[24px] font-medium tracking-[-0.02em]">
            Share your motion work
          </h2>
        </div>

        {!user?.instagram && (
          <Field
            label="Instagram username"
            hint="Stored once — reused automatically next time."
          >
            <div className="flex items-center overflow-hidden rounded-[10px] border border-line-strong focus-within:border-ink">
              <span className="bg-cloud px-3 py-2.5 font-mono text-[13px] text-fog">
                instagram.com/
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full bg-white px-2 py-2.5 text-[14px] outline-none"
              />
            </div>
          </Field>
        )}
        {user?.instagram && (
          <p className="rounded-[10px] bg-cloud px-3 py-2.5 font-mono text-[13px]">
            Posting as <span className="font-medium">@{user.instagram}</span>
          </p>
        )}

        <Field label="Post link">
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://instagram.com/p/…"
            inputMode="url"
            className={inputCls}
          />
        </Field>

        <Field label="Category">
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.id !== "all")
              .map((c) => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id as Category)}
                  className={`rounded-full border px-3 py-1.5 text-[13px] transition-colors ${
                    category === c.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line-strong hover:border-ink"
                  }`}
                >
                  {c.label}
                </button>
              ))}
          </div>
        </Field>

        {error && <p className="text-[13px] text-red-600">{error}</p>}
        <PrimaryBtn type="submit">Submit for review</PrimaryBtn>
        <p className="font-mono text-[11px] leading-relaxed text-fog">
          DEMO — goes to the admin queue as Draft/Pending, no email yet.
        </p>
      </form>
    </Modal>
  );
}
