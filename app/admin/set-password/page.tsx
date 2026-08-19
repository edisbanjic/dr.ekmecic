"use client";

import { useActionState } from "react";
import { setPassword, type PasswordState } from "@/app/admin/auth-actions";

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "13px 16px",
  borderRadius: "16px",
  border: "2px solid #EDE5D4",
  background: "#FDFBF6",
  fontSize: "15px",
};

export default function SetPasswordPage() {
  const [state, formAction, pending] = useActionState<PasswordState, FormData>(setPassword, {});

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F0E8",
        padding: "24px",
      }}
    >
      <form
        action={formAction}
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#FFFFFF",
          border: "2px solid #F0E8D8",
          borderRadius: "28px",
          padding: "36px 32px",
          boxShadow: "0 30px 60px -34px rgba(61,65,66,.45)",
          display: "grid",
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "6px" }}>
          <svg viewBox="0 0 100 100" style={{ width: "44px" }} aria-hidden="true">
            <path
              d="M50 5C31 5 15 15 15 34c0 13 6 21 10 33 3 9 3.5 23 12 23 8 0 6.5-16 13-16s5 16 13 16c8.5 0 9-14 12-23 4-12 10-20 10-33C85 15 69 5 50 5Z"
              fill="#7EAEE8"
            />
          </svg>
          <div style={{ fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "24px" }}>
            Dobrodošli! 👋
          </div>
          <p style={{ margin: "8px 0 0", fontSize: "14px", opacity: 0.7, lineHeight: 1.5, fontWeight: 600 }}>
            Postavite svoju lozinku — koristit ćete je za sve buduće prijave.
          </p>
        </div>
        <label>
          <span style={{ display: "block", fontWeight: 800, fontSize: "13.5px", marginBottom: "6px" }}>
            Nova lozinka (min. 8 znakova)
          </span>
          <input required minLength={8} type="password" name="password" autoComplete="new-password" style={fieldStyle} />
        </label>
        <label>
          <span style={{ display: "block", fontWeight: 800, fontSize: "13.5px", marginBottom: "6px" }}>
            Potvrdite lozinku
          </span>
          <input required minLength={8} type="password" name="confirm" autoComplete="new-password" style={fieldStyle} />
        </label>
        {state.error && (
          <div role="alert" style={{ fontSize: "13.5px", fontWeight: 700, color: "#C0503A" }}>
            {state.error}
          </div>
        )}
        <button
          type="submit"
          disabled={pending}
          style={{
            background: "#7EAEE8",
            color: "#243038",
            border: "none",
            cursor: pending ? "wait" : "pointer",
            fontFamily: "var(--font-fredoka)",
            fontWeight: 600,
            fontSize: "16px",
            padding: "14px",
            borderRadius: "999px",
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? "Spremam…" : "Sačuvaj i nastavi"}
        </button>
      </form>
    </div>
  );
}
