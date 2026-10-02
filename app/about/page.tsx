import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { IconArrow } from "@/components/design-system";

export const metadata: Metadata = {
  title: "About · Motion Vault (demo)",
  description:
    "Demo about page for the Motion Vault client preview — a curated motion feed rebuilt on the Hansler layout.",
};

export default function AboutPage() {
  return (
    <>
      <Topbar />
      <Sidebar />

      <div className="min-h-screen min-[1200px]:pl-[300px]">
        <div className="max-w-[820px] px-6 pb-24 pt-28 min-[810px]:px-10 min-[1200px]:px-16 min-[1200px]:pt-20">
          {/* Main Statement */}
          <h1 className="text-[26px] font-normal leading-[1.3] tracking-[-0.02em] text-ink min-[810px]:text-[34px]">
            A curated feed for motion designers — 3D, 2D, VFX and renders.
          </h1>

          <div className="mt-12 space-y-6 text-[15px] leading-[1.6] text-[#4d4d4d] min-[810px]:text-[16px]">
            <p>
              Motion Vault is a client demo preview rebuilt on the Hansler
              layout. Visitors browse the feed freely; saving, submitting and
              the dashboard use a one-click mock sign-in.
            </p>
            <p>
              All content is mock data with Instagram-style artist handles.
              Admin review, approval and rejection are simulated in the
              browser — no backend, auth or email yet.
            </p>
          </div>

          {/* Practice / Disciplines */}
          <div className="mt-16 border-t border-line pt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
              Categories
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["3D Motion", "2D Motion", "VFX", "3D Renders"].map((item) => (
                <span
                  key={item}
                  className="rounded-[15px] border border-line px-3 py-1.5 text-[13px] text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Selected Clients */}
          <div className="mt-16 border-t border-line pt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
              How the demo works
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-[14px] text-ink min-[810px]:grid-cols-3">
              {[
                "Browse without an account",
                "Save prompts mock login",
                "Mock Google sign-in",
                "Submit with IG username",
                "Admin approves posts",
                "Rejected = demo email",
                "Edit / Delete My Posts",
                "Settings + Connections",
              ].map((client) => (
                <p key={client} className="py-1">
                  {client}
                </p>
              ))}
            </div>
          </div>

          {/* Recognition */}
          <div className="mt-16 border-t border-line pt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
              Demo notes
            </h2>
            <div className="mt-4 flex flex-col divide-y divide-line">
              <div className="flex items-baseline justify-between py-3 text-[14px]">
                <span className="text-ink">No backend, database or Google OAuth yet</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Mock
                </span>
              </div>
              <div className="flex items-baseline justify-between py-3 text-[14px]">
                <span className="text-ink">Images are picsum.photos placeholders</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Mock
                </span>
              </div>
              <div className="flex items-baseline justify-between py-3 text-[14px]">
                <span className="text-ink">Admin uploads + emails simulated</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                  Mock
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[14px] text-ink hover:underline"
            >
              ← Back to the feed
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
