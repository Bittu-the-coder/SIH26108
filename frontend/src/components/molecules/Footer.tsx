import React from "react";
import Link from "next/link";
import { Logo } from "../atoms/Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand & Info */}
          <div>
            <div style={{ marginBottom: "var(--space-md)" }}>
              <Logo size={28} />
            </div>
            <p className="body-sm" style={{ maxWidth: "340px", marginBottom: "var(--space-md)", lineHeight: "20px" }}>
              Smart India Hackathon 2026 (SIH26108). Empowering procurement officers and engineers with high-precision,
              automated Indian Standards compliance, cross-reference expansion, and tender clause synthesis.
            </p>
            <div className="mono-eyebrow" style={{ fontSize: "11px" }}>
              BUREAU OF INDIAN STANDARDS (BIS) COMPLIANCE ENGINE
            </div>
          </div>

          {/* Col 2: Platform */}
          <div>
            <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--color-ink)", marginBottom: "var(--space-sm)", letterSpacing: "-0.2px" }}>
              Platform
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/recommend" className="body-sm" style={{ color: "var(--color-body)" }}>Spec Analyzer</Link></li>
              <li><Link href="/standards" className="body-sm" style={{ color: "var(--color-body)" }}>Standards Directory</Link></li>
              <li><Link href="/categories" className="body-sm" style={{ color: "var(--color-body)" }}>Categories</Link></li>
              <li><Link href="/history" className="body-sm" style={{ color: "var(--color-body)" }}>Query History</Link></li>
            </ul>
          </div>

          {/* Col 3: Research & Intelligence */}
          <div>
            <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--color-ink)", marginBottom: "var(--space-sm)", letterSpacing: "-0.2px" }}>
              Intelligence
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/admin/eval" className="body-sm" style={{ color: "var(--color-body)" }}>Evaluation Metrics</Link></li>
              <li><Link href="/docs" className="body-sm" style={{ color: "var(--color-body)" }}>Hybrid Retrieval (RRF)</Link></li>
              <li><Link href="/docs" className="body-sm" style={{ color: "var(--color-body)" }}>BGE-M3 Embeddings</Link></li>
              <li><Link href="/docs" className="body-sm" style={{ color: "var(--color-body)" }}>GeM Integration</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div>
            <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--color-ink)", marginBottom: "var(--space-sm)", letterSpacing: "-0.2px" }}>
              Legal & Open Source
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li><Link href="/docs" className="body-sm" style={{ color: "var(--color-body)" }}>API Documentation</Link></li>
              <li><Link href="/about" className="body-sm" style={{ color: "var(--color-body)" }}>Problem Statement</Link></li>
              <li><a href="https://www.services.bis.gov.in" target="_blank" rel="noreferrer" className="body-sm" style={{ color: "var(--color-body)" }}>BIS Official Portal ↗</a></li>
              <li><a href="https://gem.gov.in" target="_blank" rel="noreferrer" className="body-sm" style={{ color: "var(--color-body)" }}>GeM Portal ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "var(--space-lg)",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span className="body-sm">
            © 2026 Smart India Hackathon. Team Solution for SIH26108.
          </span>
          <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <span className="badge">v1.0.0-PROD</span>
            <span className="badge badge-green">HYBRID RRF ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
