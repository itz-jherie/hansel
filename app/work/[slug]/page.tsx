import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { projectsMeta, seedPosts } from "@/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(projectsMeta).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsMeta[slug];
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} · Hansler Framer Template`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsMeta[slug];

  if (!project) {
    notFound();
  }

  // Find all images for this project slug from seedPosts
  const projectItems = seedPosts.filter((p) => p.slug === slug);

  return (
    <>
      <Topbar />
      <Sidebar />

      <div className="min-h-screen min-[1200px]:pl-[300px]">
        <article className="max-w-[1100px] px-6 pb-24 pt-28 min-[810px]:px-10 min-[1200px]:px-16 min-[1200px]:pt-20">
          {/* Header */}
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
            <Link href="/" className="hover:text-ink">
              Work
            </Link>
            <span>/</span>
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          <h1 className="mt-4 text-[32px] font-normal leading-[1.2] tracking-[-0.02em] text-ink min-[810px]:text-[44px]">
            {project.title}
          </h1>

          <p className="mt-6 max-w-[720px] text-[16px] leading-[1.6] text-[#4d4d4d]">
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-8 min-[810px]:grid-cols-4">
            {project.client && (
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Client
                </p>
                <p className="mt-1.5 text-[14px] text-ink">{project.client}</p>
              </div>
            )}
            {project.role && (
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Role
                </p>
                <p className="mt-1.5 text-[14px] text-ink">{project.role}</p>
              </div>
            )}
            {project.credits && (
              <div className="col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Credits
                </p>
                <p className="mt-1.5 text-[14px] whitespace-pre-line text-ink">
                  {project.credits}
                </p>
              </div>
            )}
          </div>

          {/* Project Media Gallery */}
          <div className="mt-12 flex flex-col gap-8 min-[810px]:gap-12">
            {projectItems.map((item, idx) => (
              <div
                key={item.id}
                className="relative w-full overflow-hidden rounded-[5px] bg-[#f0f0f0]"
                style={{ aspectRatio: item.aspectRatio }}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.alt || `${project.title} image ${idx + 1}`}
                    fill
                    sizes="(min-width: 1200px) 1100px, 100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Next Project / Back Link */}
          <div className="mt-20 flex items-center justify-between border-t border-line pt-8">
            <Link
              href="/"
              className="text-[14px] text-[#6b6b6b] transition-colors hover:text-ink"
            >
              ← Back to selected work
            </Link>

            {project.nextProject && (
              <div className="text-right">
                <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Next project
                </span>
                <p className="text-[16px] font-medium text-ink">
                  {project.nextProject} →
                </p>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
