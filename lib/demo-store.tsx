"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  seedPosts,
  seedPending,
  type Post,
} from "@/data/projects";
import {
  normalizeCategory,
  type Category,
  type SortMode,
} from "@/lib/tokens";

export type DemoUser = {
  name: string;
  email: string;
  avatar: string;
  instagram: string;
};

export type Toast = { id: number; msg: string };

type Store = {
  user: DemoUser | null;
  posts: Post[];
  pending: Post[];
  saved: string[];
  usernames: string[];
  activePostId: string | null;
  authOpen: boolean;
  submitOpen: boolean;
  dashOpen: boolean;
  dashTab: string;
  adminOpen: boolean;
  filter: string;
  sort: SortMode;
  query: string;
  setFilter: (v: string) => void;
  setSort: (v: SortMode) => void;
  setQuery: (v: string) => void;
  toast: (msg: string) => void;
  toasts: Toast[];
  login: () => void;
  logout: () => void;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  openPost: (id: string) => void;
  closePost: () => void;
  setAuth: (v: boolean) => void;
  setSubmit: (v: boolean) => void;
  setDash: (v: boolean, tab?: string) => void;
  setAdmin: (v: boolean) => void;
  submitPost: (input: { link: string; category: Category; username: string }) => void;
  updateProfile: (patch: Partial<DemoUser>) => void;
  connectInstagram: (username: string) => void;
  deleteAccount: () => void;
  approve: (id: string) => void;
  reject: (id: string) => void;
  removePost: (id: string) => void;
  editPost: (id: string, patch: { link?: string; category?: Category }) => void;
  adminCreate: (input: { username: string; link: string; category: Category }) => void;
  copy: (text: string) => void;
  activePost: Post | null;
  savedPosts: Post[];
  myPosts: Post[];
  visiblePosts: Post[];
};

const Ctx = createContext<Store | null>(null);

const load = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [pending, setPending] = useState<Post[]>(seedPending);
  const [saved, setSaved] = useState<string[]>([]);
  const [usernames, setUsernames] = useState<string[]>(() =>
    Array.from(new Set(seedPosts.map((p) => p.username || p.slug)))
  );
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [authOpen, setAuth] = useState(false);
  const [submitOpen, setSubmit] = useState(false);
  const [dashOpen, setDashOpen] = useState(false);
  const [dashTab, setDashTab] = useState("saved");
  const [adminOpen, setAdmin] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("recent");
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Migrate legacy template posts (web/product/…) + persisted localStorage data
  // to the 4 motion categories. Runs once after hydration reads.
  const migrate = useCallback((list: Post[]): Post[] => {
    let changed = false;
    const FALLBACK_IMG =
      "https://picsum.photos/seed/motion-vault/800/600";
    const next = list.map((p) => {
      const fixed = normalizeCategory(String(p.category ?? "3d-motion"));
      const uname =
        p.username?.trim() || p.title?.trim() || p.slug || "artist";
      const img = p.image?.trim() ? p.image : FALLBACK_IMG;
      // Never emit empty-string media URLs — Next/Image throws on src="".
      const video = p.video?.trim() ? p.video : null;
      const link = p.originalLink?.trim() ? p.originalLink : img;
      if (
        fixed !== p.category ||
        uname !== p.username ||
        img !== p.image ||
        video !== p.video ||
        link !== p.originalLink
      ) {
        changed = true;
        return {
          ...p,
          category: fixed,
          username: uname,
          title: uname,
          image: img,
          video,
          originalLink: link,
        };
      }
      return p;
    });
    void changed;
    return next;
  }, []);

  useEffect(() => {
    // Guard against stale/corrupt persisted data from older builds
    // (empty-string or missing image/link/video fields new code treats as errors).
    const rawUser = load<DemoUser | null>("demo.user", null);
    if (rawUser && !rawUser.avatar?.trim())
      rawUser.avatar = "https://picsum.photos/seed/demo-user/112/112";
    setUser(rawUser);
    setSaved(load<string[]>("demo.saved", []));
    setPosts(migrate(load<Post[]>("demo.posts", seedPosts)));
    setPending(migrate(load<Post[]>("demo.pending", seedPending)));
    setUsernames(
      load<string[]>(
        "demo.usernames",
        Array.from(new Set(seedPosts.map((p) => p.username || p.slug)))
      )
    );
    setHydrated(true);
  }, [migrate]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("demo.user", JSON.stringify(user));
      localStorage.setItem("demo.saved", JSON.stringify(saved));
      localStorage.setItem("demo.posts", JSON.stringify(posts));
      localStorage.setItem("demo.pending", JSON.stringify(pending));
      localStorage.setItem("demo.usernames", JSON.stringify(usernames));
    } catch {
      /* ignore */
    }
  }, [user, saved, posts, pending, usernames, hydrated]);

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const copy = useCallback(
    (text: string) => {
      try {
        navigator.clipboard?.writeText(text);
        toast("Link copied");
      } catch {
        toast("Copy not available in this browser");
      }
    },
    [toast]
  );

  const login = useCallback(() => {
    setUser({
      name: "Demo Artist",
      email: "artist@gmail.com",
      avatar: "https://picsum.photos/seed/demo-user/112/112",
      instagram: "",
    });
    setAuth(false);
    toast("Signed in with Google (demo)");
  }, [toast]);

  const logout = useCallback(() => {
    setUser(null);
    setDashOpen(false);
    toast("Signed out");
  }, [toast]);

  const isSaved = useCallback((id: string) => saved.includes(id), [saved]);

  const toggleSave = useCallback(
    (id: string) => {
      if (!user) {
        setAuth(true);
        toast("Sign up or log in to save posts");
        return;
      }
      setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    },
    [user, toast]
  );

  const openPost = useCallback(
    (id: string) => {
      setActivePostId(id);
      setPosts((ps) => ps.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p)));
    },
    []
  );
  const closePost = useCallback(() => setActivePostId(null), []);

  const setDash = useCallback((v: boolean, tab?: string) => {
    if (tab) setDashTab(tab);
    setDashOpen(v);
  }, []);

  const submitPost = useCallback(
    (input: { link: string; category: Category; username: string }) => {
      const uname = input.username.trim().replace(/^@/, "");
      const item: Post = {
        id: `u-${Date.now()}`,
        slug: uname.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `item-${Date.now() % 997}`,
        title: uname || "Submission",
        year: "2026",
        category: input.category,
        aspectRatio: 1.5,
        image: "https://picsum.photos/seed/submission/800/600",
        alt: uname || "Submission",
        username: uname || user?.instagram || "you",
        originalLink: input.link.trim(),
        views: 0,
        likes: 0,
        createdAt: Date.now(),
        status: "pending",
        mine: true,
      };
      setPending((p) => [item, ...p]);
      if (uname && !usernames.includes(uname)) setUsernames((u) => [...u, uname]);
      setSubmit(false);
      toast("Submitted for review — visible after approval (demo)");
    },
    [toast, user, usernames]
  );

  const updateProfile = useCallback(
    (patch: Partial<DemoUser>) => {
      setUser((u) => (u ? { ...u, ...patch } : u));
      toast("Profile updated (demo)");
    },
    [toast]
  );

  const connectInstagram = useCallback(
    (username: string) => {
      const uname = username.trim().replace(/^@/, "");
      if (!uname) return;
      setUser((u) => (u ? { ...u, instagram: uname } : u));
      // future artist matching: link admin-created posts with same username
      setPosts((ps) => {
        const matched = ps.filter(
          (p) => (p.username?.toLowerCase() ?? "") === uname.toLowerCase() && !p.mine
        );
        if (matched.length > 0)
          setTimeout(
            () => toast(`${matched.length} existing post(s) linked to @${uname}`),
            300
          );
        return ps.map((p) =>
          (p.username?.toLowerCase() ?? "") === uname.toLowerCase() ? { ...p, mine: true } : p
        );
      });
      if (!usernames.includes(uname)) setUsernames((u) => [...u, uname]);
      toast(`Connected instagram.com/${uname} (demo)`);
    },
    [toast, usernames]
  );

  const deleteAccount = useCallback(() => {
    setUser(null);
    setSaved([]);
    setDashOpen(false);
    toast("Account deleted (demo)");
  }, [toast]);

  const approve = useCallback(
    (id: string) => {
      const item = pending.find((p) => p.id === id);
      if (!item) return;
      setPending((p) => p.filter((x) => x.id !== id));
      setPosts((ps) => [{ ...item, status: "published" }, ...ps]);
      toast(`Approved @${item.username} — now public`);
    },
    [pending, toast]
  );

  const reject = useCallback(
    (id: string) => {
      const item = pending.find((p) => p.id === id);
      setPending((p) => p.filter((x) => x.id !== id));
      toast(
        item
          ? `Rejected @${item.username} — email notification sent (demo)`
          : "Submission rejected"
      );
    },
    [pending, toast]
  );

  const removePost = useCallback(
    (id: string) => {
      setPosts((ps) => ps.filter((p) => p.id !== id));
      setSaved((s) => s.filter((x) => x !== id));
      toast("Post deleted (demo)");
    },
    [toast]
  );

  const editPost = useCallback(
    (id: string, patch: { link?: string; category?: Category }) => {
      setPosts((ps) =>
        ps.map((p) =>
          p.id === id
            ? {
                ...p,
                originalLink: patch.link ?? p.originalLink,
                category: patch.category ?? p.category,
              }
            : p
        )
      );
      toast("Post updated (demo)");
    },
    [toast]
  );

  const adminCreate = useCallback(
    (input: { username: string; link: string; category: Category }) => {
      const uname = input.username.trim().replace(/^@/, "");
      const item: Post = {
        id: `a-${Date.now()}`,
        slug: uname.toLowerCase().replace(/[^a-z0-9]+/g, "-") || `item-${Date.now() % 997}`,
        title: uname,
        year: "2026",
        category: input.category,
        aspectRatio: 1.5,
        image: "https://picsum.photos/seed/admin/800/600",
        alt: uname,
        username: uname,
        originalLink: input.link.trim(),
        views: 0,
        likes: 0,
        createdAt: Date.now(),
        status: "published",
        mine: !!user && user.instagram.toLowerCase() === uname.toLowerCase(),
      };
      setPosts((ps) => [item, ...ps]);
      if (!usernames.includes(uname)) setUsernames((u) => [...u, uname]);
      toast(`Published @${uname} (demo)`);
    },
    [toast, user, usernames]
  );

  const activePost = useMemo(
    () =>
      [...posts, ...pending].find((p) => p.id === activePostId) ?? null,
    [posts, pending, activePostId]
  );
  const savedPosts = useMemo(
    () => posts.filter((p) => saved.includes(p.id)),
    [posts, saved]
  );
  const myPosts = useMemo(() => posts.filter((p) => p.mine), [posts]);

  // Stage 1 §2.2: client-side Recent / Popular sort (no backend needed).
  // Recent = createdAt desc, Popular = likes desc.
  const visiblePosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = filter === "all" ? [...posts] : posts.filter((p) => p.category === filter);
    if (q)
      list = list.filter((p) =>
        `@${p.username ?? ""} ${p.title ?? ""}`.toLowerCase().includes(q)
      );
    list.sort((a, b) =>
      sort === "popular" ? b.likes - a.likes : b.createdAt - a.createdAt
    );
    return list;
  }, [posts, filter, sort, query]);

  const value: Store = {
    user,
    posts,
    pending,
    saved,
    usernames,
    activePostId,
    authOpen,
    submitOpen,
    dashOpen,
    dashTab,
    adminOpen,
    filter,
    sort,
    query,
    setFilter,
    setSort,
    setQuery,
    visiblePosts,
    toast,
    toasts,
    login,
    logout,
    isSaved,
    toggleSave,
    openPost,
    closePost,
    setAuth,
    setSubmit,
    setDash,
    setAdmin,
    submitPost,
    updateProfile,
    connectInstagram,
    deleteAccount,
    approve,
    reject,
    removePost,
    editPost,
    adminCreate,
    copy,
    activePost,
    savedPosts,
    myPosts,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
