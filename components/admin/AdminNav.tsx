"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin/calendar", label: "Kalendar" },
  { href: "/admin/patients", label: "Pacijenti" },
  { href: "/admin/staff", label: "Radnici" },
  { href: "/admin/posts", label: "Objave" },
  { href: "/admin/profile", label: "Moj profil" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="adm-nav">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className={pathname.startsWith(l.href) ? "active" : ""}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
