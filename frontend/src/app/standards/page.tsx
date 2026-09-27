"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_STANDARDS, MOCK_CATEGORIES } from "@/lib/mockData";
import { Badge } from "@/components/atoms/Badge";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Search, Filter, ExternalLink, BookOpen, Layers } from "lucide-react";

export default function StandardsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [mandatoryOnly, setMandatoryOnly] = useState(false);

  const filteredStandards = useMemo(() => {
    return MOCK_STANDARDS.filter((s) => {
      const matchCat =
        selectedCategory === "ALL" || s.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchMandatory = !mandatoryOnly || s.mandatory_status;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        s.standard_number.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        (s.title_hindi && s.title_hindi.toLowerCase().includes(q)) ||
        s.keywords.some((k) => k.toLowerCase().includes(q));

      return matchCat && matchMandatory && matchQuery;
    });
  }, [searchQuery, selectedCategory, mandatoryOnly]);

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
            and institutional furniture. All documents indexed with cross-reference relationships and keywords.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div
          style={{
            backgroundColor: "var(--color-canvas-elevated)",
            border: "1px solid var(--color-hairline)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-lg)",
            marginBottom: "var(--space-xl)",
            boxShadow: "var(--shadow-whisper)",
          }}
        >
          {/* Search Bar */}
          <div style={{ position: "relative", marginBottom: "var(--space-md)" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-mute)",
              }}
            />
            <input
              type="text"
              className="text-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by code (e.g. IS 456, IS 1786), keyword (TMT, concrete, cable), or title..."
              style={{ paddingLeft: "36px", height: "42px" }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`btn-category-pill ${selectedCategory === "ALL" ? "active" : ""}`}
                style={{ height: "32px", fontSize: "13px" }}
              >
                All Domains
              </button>
              <button
                onClick={() => setSelectedCategory("Civil")}
                className={`btn-category-pill ${selectedCategory === "Civil" ? "active" : ""}`}
                style={{ height: "32px", fontSize: "13px" }}
              >
                Civil Engineering
              </button>
              <button
                onClick={() => setSelectedCategory("Electrotechnical")}
                className={`btn-category-pill ${selectedCategory === "Electrotechnical" ? "active" : ""}`}
                style={{ height: "32px", fontSize: "13px" }}
              >
                Electrical Fittings
              </button>
              <button
                onClick={() => setSelectedCategory("Mechanical")}
                className={`btn-category-pill ${selectedCategory === "Mechanical" ? "active" : ""}`}
                style={{ height: "32px", fontSize: "13px" }}
              >
                Office Furniture
              </button>
            </div>

            {/* Toggle Mandatory */}
            <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={mandatoryOnly}
                onChange={(e) => setMandatoryOnly(e.target.checked)}
              />
              <span style={{ fontWeight: 500, color: "var(--color-ink)" }}>Mandatory Standards Only</span>
            </label>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
          <span className="body-sm" style={{ fontWeight: 500 }}>
            Showing {filteredStandards.length} of {MOCK_STANDARDS.length} Standards
          </span>
          <span className="mono-eyebrow">SORT: RELEVANCE / CODE ASC</span>
        </div>

        {/* Standards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "var(--space-lg)" }}>
          {filteredStandards.map((std) => (
            <div key={std.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-xs)" }}>
                  <Link
                    href={`/standards/${std.id}`}
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      letterSpacing: "-0.3px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span>{std.standard_number}</span>
                    <ExternalLink size={13} style={{ color: "var(--color-mute)" }} />
                  </Link>
                  <span className="badge badge-green">{std.status}</span>
                </div>

                <div style={{ fontSize: "12px", color: "var(--color-mute)", marginBottom: "var(--space-xs)" }}>
                  Pub: {std.publication_year} · {std.category}
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "8px", lineHeight: "20px" }}>
                  {std.title}
                </h3>
                {std.title_hindi && (
                  <p className="body-sm" style={{ marginBottom: "var(--space-sm)", color: "var(--color-mute)" }}>
                    {std.title_hindi}
                  </p>
                )}

                <p className="body-sm" style={{ color: "var(--color-body)", marginBottom: "var(--space-md)", lineHeight: "18px" }}>
                  {std.abstract}
                </p>

                {/* Keywords */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "var(--space-md)" }}>
                  {std.keywords.map((kw, i) => (
                    <span key={i} className="badge" style={{ fontSize: "10px" }}>
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "var(--space-sm)",
                  borderTop: "1px solid var(--color-hairline)",
                }}
              >
                {std.mandatory_status ? (
                  <Badge variant="warning">MANDATORY</Badge>
                ) : (
                  <span className="body-sm" style={{ fontSize: "11px" }}>Recommended</span>
                )}

                <Link
                  href={`/standards/${std.id}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--color-link)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>View Details & Clauses</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
