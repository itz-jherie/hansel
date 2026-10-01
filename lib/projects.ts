export type Category =
  | "web"
  | "product"
  | "systems"
  | "photography"
  | "graphic"
  | "motion";

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: Category;
  /** width / height, taken from the live site's aspect-ratio values */
  ratio: number;
  image: string;
  alt: string;
};

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "product", label: "Product" },
  { id: "systems", label: "Systems" },
  { id: "photography", label: "Photography" },
  { id: "graphic", label: "Graphic" },
  { id: "motion", label: "Motion" },
];

export const projects: Project[] = [
  {
    slug: "salt-print-no-4",
    title: "Salt Print No. 4",
    year: "2025",
    category: "photography",
    ratio: 1.5004,
    image: "/work/salt-print-no-4.jpg",
    alt: "Salt Print No. 4",
  },
  {
    slug: "loop-study-012",
    title: "Loop Study 012",
    year: "2026",
    category: "motion",
    ratio: 1.5004,
    image: "/work/loop-study-012.jpg",
    alt: "Loop Study 012",
  },
  {
    slug: "verse-quarterly",
    title: "Verse Quarterly",
    year: "2025",
    category: "graphic",
    ratio: 0.6665,
    image: "/work/verse-quarterly.jpg",
    alt: "Verse Quarterly",
  },
  {
    slug: "atlas-reader",
    title: "Atlas Reader",
    year: "2025",
    category: "product",
    ratio: 1.5004,
    image: "/work/atlas-reader.jpg",
    alt: "Atlas Reader",
  },
  {
    slug: "low-tide",
    title: "Low Tide",
    year: "2026",
    category: "photography",
    ratio: 0.6665,
    image: "/work/low-tide.jpg",
    alt: "Low Tide",
  },
  {
    slug: "asen-festival",
    title: "Åsen Festival",
    year: "2026",
    category: "graphic",
    ratio: 0.667,
    image: "/work/asen-festival.jpg",
    alt: "Åsen Festival",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    year: "2024",
    category: "graphic",
    ratio: 0.6665,
    image: "/work/field-notes.jpg",
    alt: "Field Notes",
  },
  {
    slug: "type-specimen-03",
    title: "Type Specimen 03",
    year: "2024",
    category: "graphic",
    ratio: 0.6665,
    image: "/work/type-specimen-03.jpg",
    alt: "Type Specimen 03",
  },
  {
    slug: "paper-weight",
    title: "Paper Weight",
    year: "2025",
    category: "product",
    ratio: 1.5004,
    image: "/work/paper-weight.jpg",
    alt: "Paper Weight",
  },
  {
    slug: "studio-index",
    title: "Studio Index",
    year: "2024",
    category: "systems",
    ratio: 0.8,
    image: "/work/studio-index.jpg",
    alt: "Studio Index",
  },
  {
    slug: "night-shift",
    title: "Night Shift",
    year: "2025",
    category: "motion",
    ratio: 0.667,
    image: "/work/night-shift.jpg",
    alt: "Night Shift",
  },
  {
    slug: "nordre-rooms",
    title: "Nordre Rooms",
    year: "2026",
    category: "web",
    ratio: 0.8,
    image: "/work/nordre-rooms.jpg",
    alt: "Nordre Rooms",
  },
  {
    slug: "kvist-atelier",
    title: "Kvist Atelier",
    year: "2026",
    category: "web",
    ratio: 0.8,
    image: "/work/kvist-atelier.jpg",
    alt: "Kvist Atelier",
  },
  {
    slug: "folded-matter",
    title: "Folded Matter",
    year: "2025",
    category: "product",
    ratio: 0.75,
    image: "/work/folded-matter.jpg",
    alt: "Folded Matter",
  },
  {
    slug: "havn-coffee",
    title: "Havn Coffee",
    year: "2025",
    category: "web",
    ratio: 1.5004,
    image: "/work/havn-coffee.jpg",
    alt: "Havn Coffee",
  },
  {
    slug: "mon-ceramics",
    title: "Møn Ceramics",
    year: "2024",
    category: "product",
    ratio: 0.6665,
    image: "/work/mon-ceramics.jpg",
    alt: "Møn Ceramics",
  },
  {
    slug: "glass-index",
    title: "Glass Index",
    year: "2026",
    category: "systems",
    ratio: 0.6665,
    image: "/work/glass-index.jpg",
    alt: "Glass Index",
  },
  {
    slug: "drift",
    title: "Drift",
    year: "2024",
    category: "motion",
    ratio: 1.5004,
    image: "/work/drift.jpg",
    alt: "Drift",
  },
];