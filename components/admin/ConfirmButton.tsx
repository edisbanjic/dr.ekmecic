"use client";

export default function ConfirmButton({
  action,
  poruka,
  children,
  className = "adm-dugme opasno malo",
}: {
  action: () => Promise<void>;
  poruka: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(poruka)) e.preventDefault();
      }}
      style={{ display: "inline" }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
