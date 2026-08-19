"use client";

export default function ConfirmButton({
  action,
  message,
  children,
  className = "adm-btn danger sm",
}: {
  action: () => Promise<void>;
  message: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      style={{ display: "inline" }}
    >
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
