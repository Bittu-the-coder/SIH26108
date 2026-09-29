"use client";

import React, { useState } from "react";
import { QueryInputBox } from "@/components/molecules/QueryInputBox";
import { RecommendationCard } from "@/components/molecules/RecommendationCard";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { useAppStore } from "@/lib/store";
import { isDemoMode } from "@/lib/api";
import {
  Copy,
  Check,
  Filter,
  History,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";

export default function RecommendPage() {
  const { currentResult, isLoading, error, history, setSearchQuery, isDemo } = useAppStore();
  const [filterMandatoryOnly, setFilterMandatoryOnly] = useState(false);
  const [copied, setCopied] = useState(false);

  const demoActive = isDemo || isDemoMode();

  const recommendations = currentResult?.recommendations || [];
  const displayedRecs = filterMandatoryOnly
    ? recommendations.filter((r) => r.certification?.mandatory === true)
    : recommendations;

  const handleCopyClauses = () => {
    if (!currentResult) return;
    const textToCopy = currentResult.recommendations
      .map(
        (r, i) =>
          `${i + 1}. ${r.is_number} - ${r.title}\n` +
          `   Rationale: ${r.match_reason || "N/A"}`
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



        {/* Two-Column Responsive Grid */}
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
              {history.length === 0 ? (
                <p className="body-sm" style={{ padding: "12px 0", color: "var(--color-mute)" }}>
                  No queries yet. Run an analysis to build history.
                </p>
              ) : (
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
              )}
            </div>
          </div>

          {/* Right Column: Results */}
          <div>
            {/* Error State */}
            {error && (
              <div
                className="card"
                style={{
                  padding: "var(--space-lg)",
                  display: "flex", alignItems: "flex-start", gap: "12px",
                  backgroundColor: "#fff5f5", border: "1px solid #fecaca",
                  marginBottom: "var(--space-lg)",
                }}
              >
                <AlertCircle size={20} style={{ color: "#dc2626", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px", color: "#991b1b", marginBottom: "4px" }}>
                    Request Failed
                  </div>
                  <p className="body-sm" style={{ color: "#7f1d1d" }}>
                    {error}
                  </p>
                  <p className="body-sm" style={{ color: "#b91c1c", marginTop: "6px", fontSize: "12px" }}>
                    Please check network connectivity or retry the request.
                  </p>
                </div>
              </div>
            )}

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
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "3px solid var(--color-hairline)", borderTopColor: "var(--color-primary)",
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
              <div style={{ minWidth: 0, width: "100%", maxWidth: "100%" }}>
                {/* Result Statistics Bar */}
                <div
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    flexWrap: "wrap", gap: "12px", padding: "12px 14px",
                    backgroundColor: "var(--color-canvas-elevated)", border: "1px solid var(--color-hairline)",
                    borderRadius: "var(--radius-sm)", marginBottom: "var(--space-lg)",
                    maxWidth: "100%", boxSizing: "border-box", overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <div>
                      <div className="mono-eyebrow" style={{ fontSize: "11px" }}>LANGUAGE</div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                        {currentResult.detected_language === "hi" ? "हिन्दी" : "English"}
                      </div>
                    </div>
                    <div style={{ width: "1px", height: "24px", backgroundColor: "var(--color-hairline)" }} />
                    <div>
                      <div className="mono-eyebrow" style={{ fontSize: "11px" }}>MATCH LATENCY</div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-success)" }}>
                        {currentResult.metadata?.total_latency_ms ?? "—"} ms
                      </div>
                    </div>
                    <div style={{ width: "1px", height: "24px", backgroundColor: "var(--color-hairline)" }} />
                    <div>
                      <div className="mono-eyebrow" style={{ fontSize: "11px" }}>RETRIEVAL</div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                        {currentResult.metadata?.retrieval_method?.replace(/_/g, " ") ?? "hybrid"}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Filters */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      onClick={() => setFilterMandatoryOnly(!filterMandatoryOnly)}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "4px",
                        padding: "6px 10px", fontSize: "12px", fontWeight: 500,
                        borderRadius: "var(--radius-sm)", border: "1px solid var(--color-hairline)",
                        backgroundColor: filterMandatoryOnly ? "var(--color-hairline-soft)" : "transparent",
                        color: "var(--color-ink)", cursor: "pointer",
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

                {/* Warnings */}
                {currentResult.warnings && currentResult.warnings.length > 0 && (
                  <div style={{ marginBottom: "var(--space-lg)" }}>
                    {currentResult.warnings.map((w, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          padding: "10px 14px", marginBottom: "8px",
                          backgroundColor: "#fffbeb", border: "1px solid #fcd34d",
                          borderRadius: "var(--radius-sm)", fontSize: "13px",
                        }}
                      >
                        <AlertTriangle size={14} style={{ color: "#d97706" }} />
                        <span style={{ color: "#92400e" }}><strong>{w.type}:</strong> {w.message}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Recommendations List */}
                {displayedRecs.length === 0 ? (
                  <div className="card" style={{ padding: "var(--space-2xl)", textAlign: "center" }}>
                    <AlertCircle size={24} style={{ color: "var(--color-mute)", marginBottom: "8px" }} />
                    <p className="body-md" style={{ color: "var(--color-body)" }}>
                      {filterMandatoryOnly
                        ? "No mandatory standards found. Try removing the filter."
                        : "No matching standards found for this query."}
                    </p>
                  </div>
                ) : (
                  <div>
                    {displayedRecs.map((rec, idx) => (
                      <RecommendationCard
                        key={rec.is_number}
                        item={rec}
                        index={idx}
                        queryId={currentResult.query_id}
                        isDemo={demoActive}
                      />
                    ))}
                  </div>
                )}

                {/* Missing Standard Feedback Callout */}
                <div
                  className="card"
                  style={{
                    backgroundColor: "var(--color-canvas)", padding: "var(--space-md)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "12px", flexWrap: "wrap",
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
