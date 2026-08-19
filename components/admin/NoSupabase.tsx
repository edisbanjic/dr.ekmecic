export default function NoSupabase() {
  return (
    <div className="adm-card">
      <h2 style={{ marginTop: 0, fontFamily: "var(--font-fredoka)" }}>Supabase nije konfigurisan</h2>
      <p style={{ lineHeight: 1.6 }}>
        Kopirajte <code>.env.example</code> u <code>.env.local</code>, popunite Supabase ključeve i
        pokrenite <code>supabase/schema.sql</code> u Supabase SQL editoru. Detalji su u README-u.
      </p>
    </div>
  );
}
