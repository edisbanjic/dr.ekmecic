import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase klijent vezan za sesiju prijavljenog korisnika (kolačići).
 * Koristi se u admin dijelu — RLS radi pod `authenticated` rolom.
 * Vraća null dok Supabase nije konfigurisan.
 */
export async function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Poziv iz server komponente — middleware osvježava sesiju.
        }
      },
    },
  });
}
