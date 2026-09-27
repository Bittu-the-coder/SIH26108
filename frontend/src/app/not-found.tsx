import React from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-2xl)",
      }}
    >
      <div style={{ maxWidth: "480px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "64px",
            fontWeight: 700,
            color: "var(--color-primary)",
            lineHeight: 1,
            marginBottom: "var(--space-sm)",
          }}
        >
          404
        </div>
        <h1 className="heading-md" style={{ marginBottom: "8px", color: "var(--color-ink)" }}>
          Standard or Page Not Found
        </h1>
        <p className="body-md" style={{ marginBottom: "var(--space-xl)", color: "var(--color-body)" }}>
          The requested Bureau of Indian Standards specification or portal path could not be located in the current index.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Link href="/" className="btn-primary-sm" style={{ height: "38px", padding: "0 18px" }}>
            <ArrowLeft size={14} style={{ marginRight: "6px" }} />
            <span>Return to Home</span>
          </Link>
          <Link href="/standards" className="btn-ghost-sm" style={{ height: "38px", padding: "0 18px" }}>
            <Search size={14} style={{ marginRight: "6px" }} />
            <span>Search Standards Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
