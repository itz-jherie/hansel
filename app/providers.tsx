"use client";

import { DemoProvider } from "@/lib/demo-store";
import { Admin } from "@/components/Admin";
import { AuthModal, SubmitModal } from "@/components/AuthModals";
import { Dashboard } from "@/components/Dashboard";
import { Toasts } from "@/components/Toasts";

/**
 * Global demo shell: one DemoProvider for the whole app so the Sidebar /
 * Topbar / Dashboard / Admin / PostModal all share state on every route.
 * All flows are mocked client-side (localStorage) for the client preview.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DemoProvider>
      {children}
      <AuthModal />
      <SubmitModal />
      <Dashboard />
      <Admin />
      <Toasts />
    </DemoProvider>
  );
}
