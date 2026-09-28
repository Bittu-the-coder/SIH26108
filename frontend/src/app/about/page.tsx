import React from "react";
import Link from "next/link";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Badge } from "@/components/atoms/Badge";
import { ShieldCheck, Target, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <SectionEyebrow>SMART INDIA HACKATHON 2026</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            Problem Statement SIH26108 Overview
          </h1>
          <p className="body-md">
            AI-Powered Recommendation Engine for Identifying Applicable Indian Standards (BIS) in Procurement.
          </p>
        </div>

        {/* Section: The Challenge */}
        <div className="card" style={{ marginBottom: "var(--space-xl)", padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-sm)" }}>
            <Target size={20} style={{ color: "var(--color-primary)" }} />
            <h2 className="heading-md">The Public Procurement Challenge</h2>
          </div>
          <p className="body-md" style={{ marginBottom: "var(--space-md)", lineHeight: "24px" }}>
            In government departments (CPWD, Railways, Defence, State PWDs) and public sector undertakings,
            tenders specify materials, equipment, and construction parameters. Under the <strong>Bureau of Indian Standards Act 2016</strong> and
            General Financial Rules (GFR), procurement documents must cite current, valid Indian Standards (IS codes).
          </p>
          <p className="body-md" style={{ lineHeight: "24px" }}>
            However, procurement officers frequently face hurdles:
          </p>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }} className="body-md">
            <li>Thousands of active standards that undergo periodic revision and withdrawal.</li>
            <li>Unstructured, bilingual, or non-standardized terminology in engineering schedules.</li>
            <li>Omission of mandatory secondary reference standards that govern quality testing and durability.</li>
          </ul>
        </div>

        {/* Section: The Engineered Solution */}
        <div className="card" style={{ marginBottom: "var(--space-xl)", padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-sm)" }}>
            <Award size={20} style={{ color: "var(--color-link)" }} />
            <h2 className="heading-md">Our Multi-Tier Technical Architecture</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)", marginTop: "var(--space-md)" }}>
            <div style={{ padding: "var(--space-md)", backgroundColor: "var(--color-canvas)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Bilingual BGE-M3 Embeddings</div>
              <p className="body-sm">
                1024-dimensional dense semantic vectors capable of understanding technical phrases across English, Hindi, and Hinglish.
              </p>
            </div>
            <div style={{ padding: "var(--space-md)", backgroundColor: "var(--color-canvas)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Hybrid RRF (Reciprocal Rank Fusion)</div>
              <p className="body-sm">
                Combines sparse BM25 keyword matching with vector distance to guarantee both exact code hits and conceptual matches.
              </p>
            </div>
            <div style={{ padding: "var(--space-md)", backgroundColor: "var(--color-canvas)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Recursive Graph CTEs</div>
              <p className="body-sm">
                Unrolls cross-reference dependency trees up to depth 3 to ensure zero omitted mandatory auxiliary standards.
              </p>
            </div>
            <div style={{ padding: "var(--space-md)", backgroundColor: "var(--color-canvas)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Gemini 2.0 Flash Rationale</div>
              <p className="body-sm">
                Synthesizes exact clause citations (e.g. Clause 5.6) and tender-ready compliance action points.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", paddingTop: "var(--space-lg)" }}>
          <Link href="/recommend" className="btn-primary">
            <span>Try the Live Recommendation Engine</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
