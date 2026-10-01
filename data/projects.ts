import type { Category } from "@/lib/tokens";

export type PostStatus = "published" | "pending" | "rejected";

export type Post = {
  id: string;
  /** card cover seed for placeholder art (replaced by real uploads later) */
  seed: string;
  /** artist instagram username, without @ */
  username: string;
  originalLink: string;
  category: Category;
  views: number;
  likes: number;
  createdAt: number;
  status: PostStatus;
  /** true when this post belongs to the signed-in demo user */
  mine?: boolean;
};

const DAY = 86_400_000;
const NOW = Date.now();

const artists: { username: string; seed: string; category: Category; views: number; likes: number; daysAgo: number }[] = [
  { username: "frameforge", seed: "demo-loop12", category: "3d-motion", views: 18400, likes: 2100, daysAgo: 1 },
  { username: "loophouse", seed: "demo-drift", category: "3d-motion", views: 15200, likes: 1800, daysAgo: 2 },
  { username: "pixelchoreo", seed: "demo-night", category: "2d-motion", views: 9800, likes: 1200, daysAgo: 3 },
  { username: "softsignal", seed: "demo-atlas", category: "2d-motion", views: 7400, likes: 860, daysAgo: 5 },
  { username: "chromafield", seed: "demo-verse", category: "vfx", views: 22100, likes: 2900, daysAgo: 4 },
  { username: "afterglowfx", seed: "demo-salt4", category: "vfx", views: 17900, likes: 2300, daysAgo: 6 },
  { username: "renderbooth", seed: "demo-studio", category: "renders", views: 12600, likes: 1500, daysAgo: 7 },
  { username: "clayframe", seed: "demo-paper", category: "renders", views: 8900, likes: 1040, daysAgo: 8 },
  { username: "nordloop", seed: "demo-nordre", category: "3d-motion", views: 6700, likes: 720, daysAgo: 9 },
  { username: "kvist.studio", seed: "demo-kvist", category: "renders", views: 5400, likes: 610, daysAgo: 11 },
  { username: "havn.motion", seed: "demo-havn", category: "2d-motion", views: 4800, likes: 540, daysAgo: 12 },
  { username: "lowtidefx", seed: "demo-lowtide", category: "vfx", views: 11200, likes: 1310, daysAgo: 10 },
  { username: "fold.studio", seed: "demo-folded", category: "renders", views: 3900, likes: 420, daysAgo: 14 },
  { username: "fieldnotes", seed: "demo-field", category: "2d-motion", views: 3100, likes: 380, daysAgo: 15 },
  { username: "glassindex", seed: "demo-glass", category: "3d-motion", views: 8600, likes: 990, daysAgo: 13 },
  { username: "aasen.fest", seed: "demo-aasen", category: "vfx", views: 5900, likes: 640, daysAgo: 16 },
  { username: "typechoreo", seed: "demo-type03", category: "2d-motion", views: 4300, likes: 510, daysAgo: 17 },
  { username: "mon.clay", seed: "demo-mon", category: "renders", views: 2700, likes: 310, daysAgo: 18 },
];

export const seedPosts: Post[] = artists.map((a, i) => ({
  id: `seed-${i + 1}`,
  seed: a.seed,
  username: a.username,
  originalLink: `https://instagram.com/${a.username}`,
  category: a.category,
  views: a.views,
  likes: a.likes,
  createdAt: NOW - a.daysAgo * DAY,
  status: "published",
}));

/** two pending submissions so the admin demo has something to review */
export const seedPending: Post[] = [
  {
    id: "seed-pending-1",
    seed: "demo-pending1",
    username: "newframe",
    originalLink: "https://instagram.com/p/demo123",
    category: "3d-motion",
    views: 0,
    likes: 0,
    createdAt: NOW - 4 * 3_600_000,
    status: "pending",
  },
  {
    id: "seed-pending-2",
    seed: "demo-pending2",
    username: "vfx.daily",
    originalLink: "https://instagram.com/p/demo456",
    category: "vfx",
    views: 0,
    likes: 0,
    createdAt: NOW - 26 * 3_600_000,
    status: "pending",
  },
];

export const imgUrl = (seed: string, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const formatCompact = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : `${n}`;
