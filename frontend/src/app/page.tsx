"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BeamsBackground } from "@/components/ui/beams-background";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { QueryInputBox } from "@/components/molecules/QueryInputBox";
import { RecommendationCard } from "@/components/molecules/RecommendationCard";
import { useAppStore } from "@/lib/store";
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Layers,
  Sparkles,
  GitBranch,
  BookOpen,
  Zap,
  CheckCircle,
  FileCheck2,
  Building,
  Cpu,
  Check,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Database,
  Terminal,
  FileText
} from "lucide-react";

export default function HomePage() {
  const { currentResult, isAuthenticated } = useAppStore();

  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* =========================================================================
          HERO SECTION (Official 21st.dev Animated Beams in Pure Light Mode)
          ========================================================================= */}
      <section style={{ position: "relative" }}>
        <BeamsBackground intensity="subtle">
          <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center", paddingTop: "var(--space-4xl)", paddingBottom: "var(--space-4xl)" }}>
            {/* Top Pill Announcement Badge */}
            <div style={{ display: "inline-flex", marginBottom: "var(--space-lg)" }}>
              <Link
                href="/about"
                className="announcement-badge"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "var(--color-hairline)",
                  color: "var(--color-ink)",
                  boxShadow: "var(--shadow-whisper)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#0070f3",
                    boxShadow: "0 0 8px rgba(0, 112, 243, 0.5)",
                    display: "inline-block",
                  }}
                />
                <span>Smart India Hackathon 2026 · Problem Statement SIH26108</span>
                <ChevronRight size={14} style={{ color: "var(--color-link)" }} />
              </Link>
            </div>

            {/* Display Headline with Clean High-Contrast Typography */}
            <h1
              className="display-xl"
              style={{
                maxWidth: "920px",
                margin: "0 auto var(--space-lg)",
                color: "var(--color-ink)",
                letterSpacing: "-0.03em",
              }}
            >
              Identify Applicable Indian Standards.{" "}
              <span style={{ color: "#0070f3" }}>
                In Seconds, Not Weeks.
              </span>
            </h1>

            {/* Subhead */}
            <p
              className="body-lg"
              style={{
                maxWidth: "740px",
                margin: "0 auto var(--space-2xl)",
                color: "var(--color-body)",
                fontSize: "18px",
                lineHeight: "28px",
              }}
            >
              <strong>Bisrant</strong> is the AI compliance recommendation engine for public procurement officers and engineers.
              Paste raw specifications, tender schedules, or GeM descriptions in English or Hindi to extract
              verified BIS codes, mandatory clauses, and compliance checklists.
            </p>

            {/* Primary Action Button Cluster */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "var(--space-2xl)" }}>
              <Link
                href={isAuthenticated ? "/dashboard" : "/login"}
                className="btn-primary"
                style={{
                  padding: "0 28px",
                  height: "48px",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                <span>{isAuthenticated ? "Enter Portal Dashboard" : "Get Started — Sign In"}</span>
                <ArrowRight size={16} />
              </Link>
              {!isAuthenticated && (
                <Link
                  href="/login"
                  className="btn-secondary"
                  style={{
                    padding: "0 24px",
                    height: "48px",
                    fontSize: "15px",
                  }}
                >
                  <ShieldCheck size={16} style={{ marginRight: "6px", color: "var(--color-link)" }} />
                  <span>Officer Sign In</span>
                </Link>
              )}
              <Link
                href="/standards"
                className="btn-ghost-sm"
                style={{
                  height: "48px",
                  padding: "0 20px",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                <Search size={15} style={{ marginRight: "6px" }} />
                <span>Search 2,400+ Codes</span>
              </Link>
            </div>

            {/* Engine Stat Ticker (Light Mode Glass) */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                padding: "8px 22px",
                backgroundColor: "#ffffff",
                border: "1px solid var(--color-hairline)",
                borderRadius: "var(--radius-pill)",
                marginBottom: "var(--space-3xl)",
                flexWrap: "wrap",
                justifyContent: "center",
                boxShadow: "var(--shadow-whisper)",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-ink)", display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#0b8a36", display: "inline-block" }} />
                2,415 Indexed Codes
              </span>
              <span style={{ color: "var(--color-hairline)" }}>•</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-ink)" }}>
                94.2% Top-3 Hit Rate
              </span>
              <span style={{ color: "var(--color-hairline)" }}>•</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-ink)" }}>
                142ms Hybrid RRF Latency
              </span>
              <span style={{ color: "var(--color-hairline)" }}>•</span>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-ink)" }}>
                Bilingual (EN / हिन्दी)
              </span>
            </div>

            {/* 21st.dev Style Floating Product Mockup Preview (Light Mode) */}
            <div
              className="hero-mockup-frame"
              style={{
                maxWidth: "960px",
                margin: "0 auto",
                padding: "var(--space-lg)",
                textAlign: "left",
                backgroundColor: "#ffffff",
                borderColor: "var(--color-hairline)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-floating)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--space-md)",
                  borderBottom: "1px solid var(--color-hairline)",
                  paddingBottom: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ff5f56" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#27c93f" }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--color-mute)", marginLeft: "8px" }}>
                    bis-engine --eval &quot;Fe 500D TMT Reinforcement & OPC 53&quot;
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span className="badge badge-green">
                    LIVE INFERENCE READY
                  </span>
                </div>
              </div>

              {/* Specification Input Component */}
              <QueryInputBox />
            </div>
          </div>
        </BeamsBackground>
      </section>

      {/* =========================================================================
          ACTIVE LIVE DEMO PREVIEW (If result present)
          ========================================================================= */}
      {currentResult && currentResult.recommendations.length > 0 && (
        <section style={{ padding: "var(--space-3xl) 0", backgroundColor: "var(--color-canvas)" }}>
          <div className="container" style={{ maxWidth: "960px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <SectionEyebrow>LIVE ENGINE OUTPUT</SectionEyebrow>
                <h3 className="heading-md" style={{ color: "var(--color-ink)" }}>
                  Identified Indian Standards for Current Query
                </h3>
              </div>
              <div className="badge badge-green">
                ⚡ {currentResult.metadata?.total_latency_ms ?? 0}ms · {currentResult.recommendations.length} Standards Recommended
              </div>
            </div>

            {currentResult.recommendations.slice(0, 2).map((rec, idx) => (
              <RecommendationCard key={rec.is_number} item={rec} index={idx} queryId={currentResult.query_id} />
            ))}

            <div style={{ textAlign: "center", marginTop: "var(--space-lg)" }}>
              <Link href="/recommend" className="btn-primary-sm" style={{ padding: "0 20px", height: "40px" }}>
                <span>View Full Analysis & Clause Hierarchy</span>
                <ArrowRight size={14} style={{ marginLeft: "6px" }} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          21ST.DEV BENTO GRID: FOUR-TIER ARCHITECTURE
          ========================================================================= */}
      <section id="architecture" style={{ padding: "var(--space-4xl) 0" }}>
        <div id="capabilities" className="container">
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto var(--space-3xl)" }}>
            <SectionEyebrow>ENGINEERED FOR PUBLIC PROCUREMENT</SectionEyebrow>
            <h2 className="heading-lg" style={{ marginBottom: "var(--space-sm)" }}>
              Multi-Tier Intelligence Architecture
            </h2>
            <p className="body-md">
              Designed specifically to solve Indian tender ambiguities, bilingual jargon, and overlooked auxiliary standards.
            </p>
          </div>

          <div className="bento-grid">
            {/* Bento Card 1: Hybrid RRF Search (Span 8) */}
            <div className="card bento-card-8" style={{ padding: "var(--space-xl)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="mono-eyebrow" style={{ color: "var(--color-link)" }}>HYBRID RETRIEVAL (RRF)</span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--color-ink)", margin: "8px 0" }}>
                  BGE-M3 Dense Vectors + BM25 Sparse Inverted Index
                </h3>
                <p className="body-md" style={{ marginBottom: "var(--space-lg)" }}>
                  Prevents keyword-only misses and vector hallucinations by executing simultaneous 1024-dimensional semantic similarity
                  and lexical exact-code matching in PostgreSQL with Reciprocal Rank Fusion.
                </p>
              </div>

              <div
                style={{
                  padding: "16px",
                  backgroundColor: "var(--color-canvas)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-hairline)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <div className="mono-eyebrow" style={{ fontSize: "10px" }}>DENSE VECTOR RETRIEVAL</div>
                  <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "2px" }}>BGE-M3 (1024 dims)</div>
                  <div className="body-sm" style={{ fontSize: "11px", color: "var(--color-mute)" }}>Cosine Similarity / HNSW Index</div>
                </div>
                <div>
                  <div className="mono-eyebrow" style={{ fontSize: "10px" }}>SPARSE LEXICAL INDEX</div>
                  <div style={{ fontWeight: 600, fontSize: "14px", marginTop: "2px" }}>Postgres tsvector (BM25)</div>
                  <div className="body-sm" style={{ fontSize: "11px", color: "var(--color-mute)" }}>Exact code & clause hit matching</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Bilingual NLP (Span 4) */}
            <div className="card bento-card-4" style={{ padding: "var(--space-xl)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="mono-eyebrow" style={{ color: "var(--color-violet)" }}>BILINGUAL NLP</span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--color-ink)", margin: "8px 0" }}>
                  Native English & हिन्दी
                </h3>
                <p className="body-sm" style={{ marginBottom: "var(--space-lg)" }}>
                  Resolves informal field terminology (e.g. &quot;TMT सरिया&quot;, &quot;बिजली केबल&quot;) directly to formal BIS code definitions.
                </p>
              </div>

              <div
                style={{
                  padding: "12px",
                  backgroundColor: "var(--color-canvas)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-hairline)",
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "4px" }}>
                  सरिया 415D / 500D → IS 1786:2008
                </div>
                <div className="body-sm" style={{ fontSize: "11px" }}>
                  High Strength Deformed Steel Bars for RCC
                </div>
              </div>
            </div>

            {/* Bento Card 3: Cross-Reference Graph (Span 4) */}
            <div className="card bento-card-4" style={{ padding: "var(--space-xl)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="mono-eyebrow" style={{ color: "var(--color-cyan)" }}>GRAPH TOPOLOGY</span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--color-ink)", margin: "8px 0" }}>
                  Recursive Graph CTEs
                </h3>
                <p className="body-sm" style={{ marginBottom: "var(--space-lg)" }}>
                  Traverses companion standards across 3 depths. Citing IS 456 automatically surfaces cement, aggregate, and reinforcement codes.
                </p>
              </div>

              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span className="badge badge-blue">IS 456</span>
                <span style={{ color: "var(--color-mute)" }}>→</span>
                <span className="badge">IS 1786</span>
                <span style={{ color: "var(--color-mute)" }}>→</span>
                <span className="badge">IS 269</span>
              </div>
            </div>

            {/* Bento Card 4: Actionable Clause Synthesis (Span 8) */}
            <div className="card bento-card-8" style={{ padding: "var(--space-xl)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="mono-eyebrow" style={{ color: "var(--color-pink)" }}>TENDER SYNTHESIS</span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--color-ink)", margin: "8px 0" }}>
                  Gemini 2.0 Clause Citations & Compliance Actions
                </h3>
                <p className="body-md" style={{ marginBottom: "var(--space-lg)" }}>
                  Generates ready-to-copy tender clauses, cites exact standard sections (e.g. Clause 5.1 & 5.6), and specifies
                  mandatory third-party NABL testing requirements.
                </p>
              </div>

              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "var(--color-canvas)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-hairline)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <CheckCircle size={16} style={{ color: "var(--color-success)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    &quot;Include mandatory compliance certification with IS 456 in tender clause 4.2&quot;
                  </span>
                </div>
                <span className="badge">1-Click Copy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST STRIP (Government & Standards Bodies)
          ========================================================================= */}
      <section
        id="integration"
        style={{
          borderTop: "1px solid var(--color-hairline)",
          borderBottom: "1px solid var(--color-hairline)",
          padding: "var(--space-2xl) 0",
          backgroundColor: "var(--color-canvas)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div className="mono-eyebrow" style={{ marginBottom: "var(--space-lg)", letterSpacing: "0.08em" }}>
            INTEGRATED FOR INDIAN PUBLIC PROCUREMENT & TENDERING INFRASTRUCTURE
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-ink)" }}>Bureau of Indian Standards</span>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-ink)" }}>Government e-Marketplace (GeM)</span>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-ink)" }}>CPWD Works Schedule</span>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-ink)" }}>Indian Railways (RDSO)</span>
            <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--color-ink)" }}>Ministry of Consumer Affairs</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL HIGH-IMPACT CTA BAND
          ========================================================================= */}
      <section
        style={{
          padding: "var(--space-4xl) 0",
          backgroundColor: "var(--color-canvas)",
          textAlign: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "760px" }}>
          <SectionEyebrow>START COMPLIANCE VERIFICATION</SectionEyebrow>
          <h2 className="display-xl" style={{ fontSize: "38px", lineHeight: "44px", marginBottom: "var(--space-md)" }}>
            Zero Tender Audit Failures. Total Indian Standards Compliance.
          </h2>
          <p className="body-md" style={{ marginBottom: "var(--space-2xl)", fontSize: "16px" }}>
            Join government procurement departments, project consultants, and public sector engineers
            using automated BIS standard verification.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="btn-primary"
              style={{ height: "46px", padding: "0 28px", fontSize: "15px" }}
            >
              <span>{isAuthenticated ? "Enter Portal Dashboard" : "Get Started — Sign In"}</span>
              <ArrowRight size={16} />
            </Link>
            {!isAuthenticated && (
              <Link href="/login" className="btn-secondary" style={{ height: "46px", padding: "0 24px", fontSize: "15px" }}>
                <span>Officer Log In</span>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
