"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKOVI = [
  { href: "/admin/kalendar", label: "Kalendar" },
  { href: "/admin/pacijenti", label: "Pacijenti" },
  { href: "/admin/radnici", label: "Radnici" },
  { href: "/admin/profil", label: "Moj profil" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="adm-nav">
      {LINKOVI.map((l) => (
        <Link key={l.href} href={l.href} className={pathname.startsWith(l.href) ? "aktivna" : ""}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
