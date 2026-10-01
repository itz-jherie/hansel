"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { useDemo } from "@/lib/demo-store";
import { formatCompact, imgUrl } from "@/data/projects";
import { categories, type Category } from "@/lib/tokens";
import {
  Field,
  GhostBtn,
  IconBookmark,
  IconExternal,
  Modal,
  PrimaryBtn,
  inputCls,
} from "@/components/design-system";
import { cn } from "@/lib/cn";

const tabs = ["saved", "my-posts", "settings", "connections"] as const;

export function Dashboard() {
  const d = useDemo();
  const {
    dashOpen,
    setDash,
    setAuth,
    dashTab,
    user,
    savedPosts,
    myPosts,
    toggleSave,
    openPost,
    updateProfile,
    connectInstagram,
    deleteAccount,
    logout,
    editPost,
    removePost,
  } = d;
  const [ig, setIg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editLink, setEditLink] = useState("");
  const [editCat, setEditCat] = useState<Category>("3d-motion");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!dashOpen) return null;
  if (!user)
    return (
      <Modal open onClose={() => setDash(false)}>
        <div className="p-6 text-center min-[810px]:p-8">
          <h3 className="text-[20px] font-medium">Dashboard needs an account</h3>
          <p className="mt-2 text-[14px] text-fog">
            Sign in to see Saved, My Posts and Settings.
          </p>
          <div className="mx-auto mt-5 max-w-[280px]">
            <PrimaryBtn onClick={() => { setDash(false); setAuth(true); }}>
              Login / Sign Up
            </PrimaryBtn>
          </div>
        </div>
      </Modal>
    );
  const tab = dashTab;

  const pickAvatar = (f: File | undefined) => {
    if (!f) return;
    if (f.size > 1_048_576) {
      d.toast("Image must be under 1MB (demo rule)");
      return;
    }
    const r = new FileReader();
    r.onload = () => updateProfile({ avatar: String(r.result) });
    r.readAsDataURL(f);
  };

  return (
    <Modal open wide onClose={() => setDash(false)}>
      <div className="grid min-[810px]:grid-cols-[220px_1fr]">
        {/* Recent-style side tabs */}
        <div className="border-b border-line p-4 min-[810px]:border-b-0 min-[810px]:border-r min-[810px]:p-5">
          <div className="flex items-center gap-2.5">
            <Image
              src={user?.avatar ?? "https://picsum.photos/seed/demo-user/112/112"}
              alt="Profile"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium">
                {user?.name ?? "Guest"}
              </p>
              <p className="truncate text-[12px] text-fog">
                {user?.email ?? "not signed in"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-1.5 overflow-x-auto min-[810px]:flex-col">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setDash(true, t)}
                className={cn(
                  "whitespace-nowrap rounded-[10px] px-3 py-2 text-left text-[13px] capitalize transition-colors",
                  tab === t ? "bg-ink text-paper" : "hover:bg-cloud"
                )}
              >
                {t === "my-posts" ? `My Posts (${myPosts.length})` : t === "saved" ? `Saved (${savedPosts.length})` : t}
              </button>
            ))}
          </div>
          <button
            onClick={logout}
            className="mt-3 w-full rounded-[10px] border border-line-strong py-2 text-[13px] hover:border-ink min-[810px]:text-left min-[810px]:pl-3"
          >
            Logout
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-5 min-[810px]:p-7">
          {tab === "saved" && (
            <div>
              <h3 className="text-[20px] font-medium">Saved</h3>
              {savedPosts.length === 0 ? (
                <p className="mt-3 text-[14px] text-fog">
                  Nothing saved yet — tap the bookmark on any card.
                </p>
              ) : (
                <div className="mt-4 grid grid-cols-2 gap-3 min-[810px]:grid-cols-3">
                  {savedPosts.map((p) => (
                    <div key={p.id} className="group relative overflow-hidden rounded-[8px] bg-cloud">
                      <button onClick={() => { setDash(false); openPost(p.id); }} className="block w-full">
                        <Image src={imgUrl(p.seed, 400, 400)} alt={p.username} width={400} height={400} className="aspect-square w-full object-cover" />
                      </button>
                      <button
                        onClick={() => toggleSave(p.id)}
                        aria-label="Unsave"
                        className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper"
                      >
                        <IconBookmark filled />
                      </button>
                      <p className="bg-white px-2 py-1.5 font-mono text-[11px]">@{p.username}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "my-posts" && (
            <div>
              <h3 className="text-[20px] font-medium">My Posts</h3>
              <p className="mt-1 font-mono text-[11px] text-fog">
                Approved submissions appear here with Edit / Delete.
              </p>
              {myPosts.length === 0 ? (
                <p className="mt-3 text-[14px] text-fog">
                  No approved posts yet. {user?.instagram ? "Admin-created posts matching your Instagram will link here automatically." : "Connect your Instagram under Connections."}
                </p>
              ) : (
                <div className="mt-4 flex flex-col gap-2">
                  {myPosts.map((p) => (
                    <div key={p.id} className="rounded-[12px] border border-line p-3">
                      <div className="flex items-center gap-3">
                        <Image src={imgUrl(p.seed, 200, 200)} alt="" width={56} height={56} className="h-14 w-14 rounded-[8px] object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] font-medium">@{p.username}</p>
                          <p className="truncate font-mono text-[11px] text-fog">
                            {p.category} · ♥ {formatCompact(p.likes)} · {formatCompact(p.views)} views
                          </p>
                        </div>
                        <a href={p.originalLink} target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong" aria-label="Open original">
                          <IconExternal />
                        </a>
                      </div>
                      {editing === p.id ? (
                        <div className="mt-3 flex flex-col gap-2">
                          <input value={editLink} onChange={(e) => setEditLink(e.target.value)} className={inputCls} placeholder="Post link" />
                          <div className="flex flex-wrap gap-1.5">
                            {categories.filter((c) => c.id !== "all").map((c) => (
                              <button key={c.id} onClick={() => setEditCat(c.id as Category)} className={cn("rounded-full border px-2.5 py-1 text-[12px]", editCat === c.id ? "border-ink bg-ink text-paper" : "border-line-strong")}>
                                {c.label}
                              </button>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <GhostBtn onClick={() => { editPost(p.id, { link: editLink, category: editCat }); setEditing(null); }}>Save</GhostBtn>
                            <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-3 flex gap-2">
                          <GhostBtn onClick={() => { setEditing(p.id); setEditLink(p.originalLink); setEditCat(p.category); }}>Edit</GhostBtn>
                          <GhostBtn danger onClick={() => removePost(p.id)}>Delete</GhostBtn>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "settings" && (
            <div className="flex max-w-[420px] flex-col gap-4">
              <h3 className="text-[20px] font-medium">Settings</h3>
              <div className="flex items-center gap-3">
                <Image src={user?.avatar ?? ""} alt="" width={56} height={56} className="h-14 w-14 rounded-full bg-cloud object-cover" />
                <div>
                  <GhostBtn onClick={() => fileRef.current?.click()}>Upload picture</GhostBtn>
                  <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => pickAvatar(e.target.files?.[0])} />
                  <p className="mt-1 font-mono text-[11px] text-fog">Max 1MB (demo enforced)</p>
                </div>
              </div>
              <Field label="Name">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder={user?.name ?? "Your name"} className={inputCls} />
              </Field>
              <Field label="Email">
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={user?.email ?? "you@gmail.com"} className={inputCls} />
              </Field>
              <PrimaryBtn onClick={() => { updateProfile({ ...(name && { name }), ...(email && { email }) }); setName(""); setEmail(""); }}>
                Save changes
              </PrimaryBtn>
              {!confirmDelete ? (
                <button onClick={() => setConfirmDelete(true)} className="mt-2 text-left text-[13px] text-red-600">
                  Delete account…
                </button>
              ) : (
                <div className="rounded-[10px] border border-red-200 bg-red-50 p-3">
                  <p className="text-[13px]">Delete your account and saved posts?</p>
                  <div className="mt-2 flex gap-2">
                    <GhostBtn danger onClick={deleteAccount}>Yes, delete</GhostBtn>
                    <GhostBtn onClick={() => setConfirmDelete(false)}>Cancel</GhostBtn>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "connections" && (
            <div className="flex max-w-[420px] flex-col gap-4">
              <h3 className="text-[20px] font-medium">Connections</h3>
              <Field label="Email" hint="Google account used at sign-in.">
                <input value={user?.email ?? ""} disabled className={`${inputCls} bg-cloud`} />
              </Field>
              <Field label="Instagram" hint="Just the username — we store instagram.com/username.">
                {user?.instagram ? (
                  <p className="rounded-[10px] bg-cloud px-3 py-2.5 font-mono text-[13px]">
                    instagram.com/<span className="font-medium">{user.instagram}</span>
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <div className="flex flex-1 items-center overflow-hidden rounded-[10px] border border-line-strong focus-within:border-ink">
                      <span className="bg-cloud px-3 py-2.5 font-mono text-[13px] text-fog">instagram.com/</span>
                      <input value={ig} onChange={(e) => setIg(e.target.value)} placeholder="username" className="w-full bg-white px-2 py-2.5 text-[14px] outline-none" />
                    </div>
                    <GhostBtn onClick={() => { connectInstagram(ig); setIg(""); }}>Save</GhostBtn>
                  </div>
                )}
              </Field>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
