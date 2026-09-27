import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_STANDARDS } from "@/lib/mockData";
import { Badge } from "@/components/atoms/Badge";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import {
  ArrowLeft,
  Share2,
  Bookmark,
  FileText,
  Network,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StandardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const standard = MOCK_STANDARDS.find(
    (s) => s.id === id || s.standard_number.toLowerCase().replace(/[:\s]/g, "-") === id.toLowerCase()
  ) || MOCK_STANDARDS[0];

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Back Link */}
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <Link
            href="/standards"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--color-mute)",
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} />
            <span>Back to Standards Directory</span>
          </Link>
        </div>

        {/* Main Header Card */}
        <div className="card" style={{ marginBottom: "var(--space-xl)", padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "var(--space-sm)", flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span className="badge badge-green">{standard.status}</span>
                {standard.mandatory_status && <Badge variant="warning">MANDATORY CITATION</Badge>}
                <span className="badge">{standard.category}</span>
              </div>
              <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "4px" }}>
                {standard.standard_number}
              </h1>
              <div style={{ fontSize: "18px", fontWeight: 500, color: "var(--color-body)", marginBottom: "8px" }}>
                {standard.title}
              </div>
              {standard.title_hindi && (
                <div style={{ fontSize: "16px", color: "var(--color-mute)" }}>
                  {standard.title_hindi}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <Link
                href={`/recommend`}
                className="btn-primary-sm"
                style={{ height: "36px", padding: "0 14px" }}
              >
                <Sparkles size={14} style={{ marginRight: "4px" }} />
                <span>Analyze Spec for this Code</span>
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--space-xl)",
              paddingTop: "var(--space-md)",
              borderTop: "1px solid var(--color-hairline)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="mono-eyebrow" style={{ fontSize: "11px" }}>PUBLISHED YEAR</div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                {standard.publication_year}
              </div>
            </div>
            <div>
              <div className="mono-eyebrow" style={{ fontSize: "11px" }}>SUB-CATEGORY</div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                {standard.subcategory}
              </div>
            </div>
            <div>
              <div className="mono-eyebrow" style={{ fontSize: "11px" }}>LEGAL JURISDICTION</div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                National Standard of India (BIS Act 2016)
              </div>
            </div>
          </div>
        </div>

        {/* Abstract & Scope */}
        <div className="card" style={{ marginBottom: "var(--space-xl)" }}>
          <SectionEyebrow>OFFICIAL SCOPE & ABSTRACT</SectionEyebrow>
          <h2 className="heading-md" style={{ marginBottom: "var(--space-sm)" }}>
            Standard Overview
          </h2>
          <p className="body-lg" style={{ color: "var(--color-body)", lineHeight: "26px", marginBottom: "var(--space-md)" }}>
            {standard.abstract}
          </p>
          {standard.abstract_hindi && (
            <div
              style={{
                padding: "var(--space-md)",
                backgroundColor: "var(--color-canvas)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-hairline)",
              }}
            >
              <div className="mono-eyebrow" style={{ marginBottom: "4px" }}>हिन्दी सारांश (HINDI SUMMARY)</div>
              <p className="body-md" style={{ color: "var(--color-body)", lineHeight: "24px" }}>
                {standard.abstract_hindi}
              </p>
            </div>
          )}
        </div>

        {/* Cross-Reference Dependency Graph */}
        <div className="card" style={{ marginBottom: "var(--space-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
            <div>
              <SectionEyebrow>GRAPH TOPOLOGY</SectionEyebrow>
              <h2 className="heading-md">Interlinked Indian Standards Network</h2>
            </div>
            <span className="badge badge-blue">RECURSIVE GRAPH CTE ACTIVE</span>
          </div>

          <p className="body-md" style={{ marginBottom: "var(--space-md)" }}>
            Under Indian public procurement regulations, citing {standard.standard_number} implicitly binds contractor
            compliance with all referenced testing methods and sub-assembly codes:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {standard.cross_references && standard.cross_references.length > 0 ? (
              standard.cross_references.map((cr, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px var(--space-md)",
                    backgroundColor: "var(--color-canvas)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Network size={16} style={{ color: "var(--color-link)" }} />
                    <div>
                      <Link
                        href={`/standards/${cr.standard_id}`}
                        style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}
                      >
                        {cr.standard_number}
                      </Link>
                      {cr.clause && (
                        <span className="body-sm" style={{ marginLeft: "8px", color: "var(--color-mute)" }}>
                          ({cr.clause})
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="badge">{cr.relation_type}</span>
                </div>
              ))
            ) : (
              <div className="body-sm">No secondary cross-references recorded.</div>
            )}
          </div>
        </div>

        {/* Indexing Keywords */}
        <div className="card">
          <SectionEyebrow>SEMANTIC INDEXING TAGS</SectionEyebrow>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
            {standard.keywords.map((kw, i) => (
              <span key={i} className="badge" style={{ padding: "4px 10px", fontSize: "12px" }}>
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
