export const tokens = {
  color: {
    bg: "#ffffff",
    ink: "#000000",
    gray: "#4d4d4d",
    muted: "#6b6b6b",
    faint: "#999999",
    panel: "#f2f2f2",
    line: "rgba(0,0,0,0.10)",
    lineStrong: "rgba(0,0,0,0.22)",
    glass: "rgba(255,255,255,0.80)",
    glassStrong: "rgba(255,255,255,0.92)",
    green: "#1A7F37",
  },
  font: {
    sans: '"Instrument Sans","Instrument Sans Variable",-apple-system,Inter,sans-serif',
    mono: '"IBM Plex Mono",ui-monospace,Menlo,monospace',
  },
  type: {
    wordmark: { size: 19, weight: 500, tracking: "-0.015em", leading: 1.3 },
    pill: { size: 11, tracking: "+0.07em" },
    body: { size: 13, tracking: "-0.02em", leading: 1.45 },
    nav: { size: 15, tracking: "-0.01em" },
    caption: { size: 11 },
  },
  layout: {
    sidebarWidth: 300,
    radius: { card: 5, pill: 15, avatar: 14, bar: 13 },
    gap: { feedDesktop: 24, feedTablet: 18, feedMobile: 10 },
  },
  breakpoint: {
    desktop: 1200,
    tablet: 810,
  },
} as const;

export type Category =
  | "3d-motion"
  | "2d-motion"
  | "vfx"
  | "3d-renders";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "3d-motion", label: "3D Motion" },
  { id: "2d-motion", label: "2D Motion" },
  { id: "vfx", label: "VFX" },
  { id: "3d-renders", label: "3D Renders" },
];

/** Legacy Hansler template categories → motion-vault categories (mock migration). */
export const legacyCategoryMap: Record<string, Category> = {
  web: "3d-motion",
  product: "3d-renders",
  systems: "2d-motion",
  photography: "3d-renders",
  graphic: "2d-motion",
  motion: "3d-motion",
  renders: "3d-renders",
};

export function normalizeCategory(raw: string): Category {
  const key = raw.trim().toLowerCase().replace(/[\s_]+/g, "-");
  if (
    key === "3d-motion" ||
    key === "2d-motion" ||
    key === "vfx" ||
    key === "3d-renders"
  )
    return key;
  return legacyCategoryMap[key] ?? "3d-motion";
}

export type SortMode = "recent" | "popular";

export const sorts: { id: SortMode; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "popular", label: "Popular" },
];
