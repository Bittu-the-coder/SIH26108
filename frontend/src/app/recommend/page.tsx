"use client";

import React, { useState } from "react";
import { QueryInputBox } from "@/components/molecules/QueryInputBox";
import { RecommendationCard } from "@/components/molecules/RecommendationCard";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { useAppStore } from "@/lib/store";
import {
  Download,
  Copy,
  Check,
  Filter,
  Sparkles,
  History,
  FileCheck,
  AlertTriangle
} from "lucide-react";

export default function RecommendPage() {
  const { currentResult, isLoading, history, setSearchQuery } = useAppStore();
  const [filterMandatoryOnly, setFilterMandatoryOnly] = useState(false);
  const [copied, setCopied] = useState(false);

  const recommendations = currentResult?.recommendations || [];
  const displayedRecs = filterMandatoryOnly
    ? recommendations.filter((r) => r.is_mandatory)
    : recommendations;

  const handleCopyClauses = () => {
    if (!currentResult) return;
    const textToCopy = currentResult.recommendations
      .map(
        (r, i) =>
          `${i + 1}. ${r.standard.standard_number} - ${r.standard.title}\n` +
          `   Compliance Rationale: ${r.explanation}\n` +
          `   Key Actions: ${r.compliance_actions.join("; ")}`
      )
      .join("\n\n");

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: "var(--space-xl)" }}>
          <SectionEyebrow>INTELLIGENT SPECIFICATION AUDITOR</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            AI Indian Standards Recommendation Engine
          </h1>
          <p className="body-md" style={{ maxWidth: "720px" }}>
            Input technical specifications, tender work items, or GeM catalog descriptions to receive
            applicable Bureau of Indian Standards (BIS) codes, confidence ratings, and tender-ready compliance stipulations.
          </p>
        </div>

        {/* Two-Column Responsive Grid: Left is Input & History, Right is Results */}
        <div className="recommend-layout-grid">
          {/* Left Column: Spec Input & Recent Queries */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            <QueryInputBox />

            {/* Recent Searches Box */}
            <div className="card" style={{ padding: "var(--space-md)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "var(--space-sm)" }}>
                <History size={15} style={{ color: "var(--color-mute)" }} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-ink)" }}>
                  Recent Tender Queries
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {history.slice(0, 4).map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSearchQuery(h.query)}
                    style={{
                      textAlign: "left",
                      padding: "8px 10px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-hairline)",
                      backgroundColor: "var(--color-canvas)",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <div style={{ fontWeight: 500, color: "var(--color-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {h.query}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", color: "var(--color-mute)" }}>
                      <span>Top: {h.top_standard}</span>
                      <span>{h.timestamp}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engine Analysis & Standards Matches */}
          <div>
            {isLoading ? (
              <div
                className="card"
                style={{
                  padding: "var(--space-3xl) var(--space-xl)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "3px solid var(--color-hairline)",
                    borderTopColor: "var(--color-primary)",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--color-ink)" }}>
                  Executing Hybrid Vector + BM25 Match...
                </div>
                <p className="body-sm">
                  Embedding query via BGE-M3 (1024-dim), running RRF rank fusion, and traversing cross-reference graph.
                </p>
              </div>
            ) : currentResult ? (
              <div>
                {/* Result Statistics Bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    padding: "var(--space-md)",
                    backgroundColor: "var(--color-canvas-elevated)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: "var(--space-lg)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div>
                      <div className="mono-eyebrow" style={{ fontSize: "11px" }}>DETECTED CATEGORY</div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                        {currentResult.detected_category}
                      </div>
                    </div>
                    <div style={{ width: "1px", height: "24px", backgroundColor: "var(--color-hairline)" }} />
                    <div>
                      <div className="mono-eyebrow" style={{ fontSize: "11px" }}>MATCH LATENCY</div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-success)" }}>
                        {currentResult.execution_time_ms} ms
                      </div>
                    </div>
                  </div>

                  {/* Actions & Filters */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => setFilterMandatoryOnly(!filterMandatoryOnly)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "6px 10px",
                        fontSize: "12px",
                        fontWeight: 500,
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-hairline)",
                        backgroundColor: filterMandatoryOnly ? "var(--color-hairline-soft)" : "transparent",
                        color: "var(--color-ink)",
                        cursor: "pointer",
                      }}
                    >
                      <Filter size={13} />
                      <span>{filterMandatoryOnly ? "Showing Mandatory" : "All Matches"}</span>
                    </button>

                    <button
                      onClick={handleCopyClauses}
                      className="btn-ghost-sm"
                      style={{ height: "30px", fontSize: "12px" }}
                    >
                      {copied ? <Check size={13} style={{ color: "var(--color-success)" }} /> : <Copy size={13} />}
                      <span>{copied ? "Copied!" : "Copy Tender Clauses"}</span>
                    </button>
                  </div>
                </div>

                {/* Recommendations List */}
                <div>
                  {displayedRecs.map((rec) => (
                    <RecommendationCard
                      key={rec.standard.id}
                      item={rec}
                      queryId={currentResult.query_id}
                    />
                  ))}
                </div>

                {/* Missing Standard Feedback Callout */}
                <div
                  className="card"
                  style={{
                    backgroundColor: "var(--color-canvas)",
                    padding: "var(--space-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <AlertTriangle size={16} style={{ color: "var(--color-warning-deep)" }} />
                    <span className="body-sm" style={{ color: "var(--color-body)" }}>
                      Notice an applicable Indian Standard missing from these recommendations?
                    </span>
                  </div>
                  <button
                    onClick={() => alert("Thank you. Our continuous learning loop records your feedback to fine-tune vector embeddings.")}
                    className="btn-ghost-sm"
                    style={{ height: "28px", fontSize: "12px" }}
                  >
                    Suggest Missing Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="card" style={{ padding: "var(--space-3xl)", textAlign: "center" }}>
                <p className="body-md">Enter a technical description to begin analysis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
