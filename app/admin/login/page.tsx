"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/auth-actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

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
          maxWidth: "380px",
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-full.webp"
            alt="Dr. Ekmečić — stomatološka ordinacija"
            width={1060}
            height={248}
            style={{ width: "100%", maxWidth: "230px", height: "auto", margin: "0 auto 14px", display: "block" }}
          />
          <div style={{ fontFamily: "var(--font-fredoka)", fontWeight: 700, fontSize: "24px" }}>
            Admin prijava
          </div>
        </div>
        <label>
          <span style={{ display: "block", fontWeight: 800, fontSize: "13.5px", marginBottom: "6px" }}>Email</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            style={{
              width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: "16px",
              border: "2px solid #EDE5D4", background: "#FDFBF6", fontSize: "15px",
            }}
          />
        </label>
        <label>
          <span style={{ display: "block", fontWeight: 800, fontSize: "13.5px", marginBottom: "6px" }}>Lozinka</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            style={{
              width: "100%", boxSizing: "border-box", padding: "13px 16px", borderRadius: "16px",
              border: "2px solid #EDE5D4", background: "#FDFBF6", fontSize: "15px",
            }}
          />
          <span style={{ display: "block", fontSize: "12px", opacity: 0.55, fontWeight: 700, marginTop: "6px" }}>
            Prva prijava? Ostavite lozinku praznom — postavit ćete je u sljedećem koraku.
          </span>
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
            background: "#7EAEE8", color: "#243038", border: "none",
            cursor: pending ? "wait" : "pointer", fontFamily: "var(--font-fredoka)",
            fontWeight: 600, fontSize: "16px", padding: "14px", borderRadius: "999px",
            opacity: pending ? 0.7 : 1,
          }}
        >
          {pending ? "Prijava…" : "Prijavi se"}
        </button>
        <a href="/" style={{ textAlign: "center", fontSize: "13px", fontWeight: 700, opacity: 0.6 }}>
          ← nazad na sajt
        </a>
      </form>
    </div>
  );
}
