"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { StandardBase, PaginatedResponse } from "@/lib/types";
import { searchStandards, isDemoMode } from "@/lib/api";
import { Badge } from "@/components/atoms/Badge";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Search, ExternalLink, AlertCircle, Loader2, Info, ChevronLeft, ChevronRight } from "lucide-react";

export default function StandardsDirectoryPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);

  const [data, setData] = useState<PaginatedResponse<StandardBase> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const demoActive = isDemoMode();

  const fetchStandards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchStandards({
        q: query || undefined,
        category: selectedCategory !== "ALL" ? selectedCategory : undefined,
        page,
        per_page: perPage,
      });
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load standards");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCategory, page, perPage]);

  useEffect(() => {
    fetchStandards();
  }, [fetchStandards]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [query, selectedCategory]);

  const totalPages = data ? Math.ceil(data.total / data.per_page) : 0;

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <SectionEyebrow>BUREAU OF INDIAN STANDARDS CATALOG</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            Indian Standards Directory
          </h1>
          <p className="body-md" style={{ maxWidth: "700px" }}>
            Search, filter, and inspect verified specifications across civil works, electrical engineering,
            and institutional furniture. All documents indexed with cross-reference relationships.
          </p>
        </div>

        {/* Demo Mode Indicator */}
        {demoActive && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", backgroundColor: "#eef6ff", border: "1px solid #b3d4fc", borderRadius: "var(--radius-sm)", marginBottom: "var(--space-lg)", fontSize: "13px", color: "#1a56db" }}>
            <Info size={15} />
            <span><strong>Demo Mode</strong> — Browsing pre-loaded sample standards data.</span>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div
          style={{
            backgroundColor: "var(--color-canvas-elevated)", border: "1px solid var(--color-hairline)",
            borderRadius: "var(--radius-md)", padding: "var(--space-lg)", marginBottom: "var(--space-xl)",
            boxShadow: "var(--shadow-whisper)",
          }}
        >
          <div style={{ position: "relative", marginBottom: "var(--space-md)" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-mute)" }} />
            <input
              type="text"
              className="text-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by code (e.g. IS 456, IS 1786), or title..."
              style={{ paddingLeft: "36px", height: "42px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["ALL", "Civil", "Electrotechnical", "Mechanical"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn-category-pill ${selectedCategory === cat ? "active" : ""}`}
                style={{ height: "32px", fontSize: "13px" }}
              >
                {cat === "ALL" ? "All Domains" : cat === "Civil" ? "Civil Engineering" : cat === "Electrotechnical" ? "Electrical Fittings" : "Office Furniture"}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div
            className="card"
            style={{
              padding: "var(--space-lg)", display: "flex", alignItems: "flex-start", gap: "12px",
              backgroundColor: "#fff5f5", border: "1px solid #fecaca", marginBottom: "var(--space-lg)",
            }}
          >
            <AlertCircle size={20} style={{ color: "#dc2626", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#991b1b", marginBottom: "4px" }}>
                Failed to Load Standards
              </div>
              <p className="body-sm" style={{ color: "#7f1d1d" }}>{error}</p>
              <button onClick={fetchStandards} className="btn-ghost-sm" style={{ marginTop: "8px", fontSize: "12px" }}>
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="card" style={{ padding: "var(--space-3xl)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
            <Loader2 size={28} className="animate-spin" style={{ color: "var(--color-primary)" }} />
            <p className="body-sm">Loading standards catalog...</p>
          </div>
        )}

        {/* Results */}
        {!loading && data && (
          <>
            {/* Results Counter */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
              <span className="body-sm" style={{ fontWeight: 500 }}>
                Showing {data.results.length} of {data.total} Standards (Page {data.page})
              </span>
              <span className="mono-eyebrow">SORT: RELEVANCE / CODE ASC</span>
            </div>

            {data.results.length === 0 ? (
              <div className="card" style={{ padding: "var(--space-3xl)", textAlign: "center" }}>
                <AlertCircle size={28} style={{ color: "var(--color-mute)", marginBottom: "12px" }} />
                <p className="body-md" style={{ color: "var(--color-body)", fontWeight: 500 }}>
                  No standards found matching your search criteria.
                </p>
                <p className="body-sm" style={{ marginTop: "8px" }}>
                  Try a different keyword or remove filters.
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "var(--space-lg)" }}>
                {data.results.map((std) => (
                  <div key={std.is_number} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-xs)" }}>
                        <Link
                          href={`/standards/${encodeURIComponent(std.is_number)}`}
                          style={{
                            fontSize: "17px", fontWeight: 600, color: "var(--color-ink)",
                            letterSpacing: "-0.3px", display: "flex", alignItems: "center", gap: "6px",
                          }}
                        >
                          <span>{std.is_number}</span>
                          <ExternalLink size={13} style={{ color: "var(--color-mute)" }} />
                        </Link>
                        <span className="badge badge-green">{std.status}</span>
                      </div>

                      <div style={{ fontSize: "12px", color: "var(--color-mute)", marginBottom: "var(--space-xs)" }}>
                        {std.classification}
                      </div>

                      <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "8px", lineHeight: "20px" }}>
                        {std.title}
                      </h3>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--space-sm)", borderTop: "1px solid var(--color-hairline)" }}>
                      <Badge variant="default">{std.classification.split(" ")[0]}</Badge>
                      <Link
                        href={`/standards/${encodeURIComponent(std.is_number)}`}
                        style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-link)", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <span>View Details</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginTop: "var(--space-xl)" }}>
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page <= 1}
                  className="btn-ghost-sm"
                  style={{ height: "34px", opacity: page <= 1 ? 0.4 : 1 }}
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="body-sm" style={{ fontWeight: 500 }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page >= totalPages}
                  className="btn-ghost-sm"
                  style={{ height: "34px", opacity: page >= totalPages ? 0.4 : 1 }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
