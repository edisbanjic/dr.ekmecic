import type { Metadata } from "next";
import { odjava } from "@/app/admin/auth-actions";
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
          <svg viewBox="0 0 100 100" style={{ width: "26px" }} aria-hidden="true">
            <path
              d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z"
              fill="#7EAEE8"
            />
          </svg>
          <span>
            DR. EKMEČIĆ
            <small>ADMIN PANEL</small>
          </span>
        </a>
        <AdminNav />
        <form action={odjava}>
          <button type="submit" className="adm-odjava">Odjava</button>
        </form>
      </header>
      <main className="adm-main">{children}</main>
    </div>
  );
}
