import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { IconArrow } from "@/components/design-system";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact · Motion Vault (demo)",
  description:
    "Demo contact page for the Motion Vault client preview — support links to Gmail.",
};

export default function ContactPage() {
  return (
    <>
      <Topbar />
      <Sidebar />

      <div className="min-h-screen min-[1200px]:pl-[300px]">
        <div className="max-w-[760px] px-6 pb-24 pt-28 min-[810px]:px-10 min-[1200px]:px-16 min-[1200px]:pt-20">
          <h1 className="text-[26px] font-normal leading-[1.3] tracking-[-0.02em] text-ink min-[810px]:text-[34px]">
            Support & contact
          </h1>

          <p className="mt-4 text-[15px] leading-[1.6] text-[#4d4d4d]">
            Questions about the demo, submissions or the admin queue — reach us
            on Gmail and we&apos;ll reply.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 border-y border-line py-8 min-[810px]:grid-cols-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                Email
              </p>
              <a
                href="mailto:hello@motionvault.studio"
                className="mt-1.5 block text-[15px] text-ink hover:underline"
              >
                hello@motionvault.studio
              </a>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                Support
              </p>
              <p className="mt-1.5 text-[15px] text-ink">
                Via Gmail
              </p>
              <p className="font-mono text-[11px] text-[#6b6b6b]">
                Replies within a day (demo)
              </p>
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
                Elsewhere
              </p>
              <div className="mt-1.5 flex flex-col gap-1 text-[14px]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#4d4d4d] hover:text-ink"
                >
                  Instagram <IconArrow />
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[#4d4d4d] hover:text-ink"
                >
                  X <IconArrow />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />

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
