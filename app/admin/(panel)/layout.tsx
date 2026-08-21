import type { Metadata } from "next";
import { logout } from "@/app/admin/auth-actions";
import AdminNav from "@/components/admin/AdminNav";
import "../admin.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Ordinacija dr. Ekmečić",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <a href="/admin" className="adm-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.webp" alt="Dr. Ekmečić" width={1060} height={190} />
          <small>ADMIN PANEL</small>
        </a>
        <AdminNav />
        <form action={logout}>
          <button type="submit" className="adm-logout">Odjava</button>
        </form>
      </header>
      <main className="adm-main">{children}</main>
    </div>
  );
}
