"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { StandardDetail } from "@/lib/types";
import { getStandardByIsNumber, isDemoMode } from "@/lib/api";
import { Badge } from "@/components/atoms/Badge";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Network,
  Sparkles,
  AlertCircle,
  Loader2,
  Info,
} from "lucide-react";

export default function StandardDetailPage() {
  const params = useParams();
  const isNumber = decodeURIComponent(params.id as string);

  const [standard, setStandard] = useState<StandardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const demoActive = isDemoMode();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const detail = await getStandardByIsNumber(isNumber);
        setStandard(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load standard");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isNumber]);

  // Cross-references from the backend dict format
  const crossRefEntries = standard?.cross_references
    ? Object.entries(standard.cross_references).flatMap(([relType, refs]) =>
        refs.map((ref) => ({ relation_type: relType.replace(/_/g, " "), is_number: ref }))
      )
    : [];

  if (loading) {
    return (
      <div style={{ padding: "var(--space-4xl) 0", textAlign: "center" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <Loader2 size={32} className="animate-spin" style={{ color: "var(--color-primary)" }} />
          <p className="body-md">Loading standard details...</p>
        </div>
      </div>
    );
  }

  if (error || !standard) {
    return (
      <div style={{ padding: "var(--space-4xl) 0" }}>
        <div className="container" style={{ maxWidth: "600px" }}>
          <div className="card" style={{ padding: "var(--space-2xl)", textAlign: "center" }}>
            <AlertCircle size={36} style={{ color: "#dc2626", marginBottom: "12px" }} />
            <h2 className="heading-md" style={{ color: "#991b1b", marginBottom: "8px" }}>
              Standard Not Found
            </h2>
            <p className="body-md" style={{ color: "var(--color-body)", marginBottom: "var(--space-lg)" }}>
              {error || `Could not find standard "${isNumber}".`}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              <Link href="/standards" className="btn-primary" style={{ height: "38px", padding: "0 16px" }}>
                <ArrowLeft size={14} />
                <span>Back to Directory</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isMandatory = standard.certification && standard.certification !== "none";

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Back Link */}
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <Link
            href="/standards"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-mute)", fontWeight: 500 }}
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
                {isMandatory && <Badge variant="warning">MANDATORY CITATION</Badge>}
                <span className="badge">{standard.classification}</span>
              </div>
              <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "4px" }}>
                {standard.is_number}
              </h1>
              <div style={{ fontSize: "18px", fontWeight: 500, color: "var(--color-body)", marginBottom: "8px" }}>
                {standard.title}
              </div>
              {standard.title_hi && (
                <div style={{ fontSize: "16px", color: "var(--color-mute)" }}>
                  {standard.title_hi}
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <Link href="/recommend" className="btn-primary-sm" style={{ height: "36px", padding: "0 14px" }}>
                <Sparkles size={14} style={{ marginRight: "4px" }} />
                <span>Analyze Spec for this Code</span>
              </Link>
            </div>
          </div>

          <div style={{ display: "flex", gap: "var(--space-xl)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--color-hairline)", flexWrap: "wrap" }}>
            {standard.year_published && (
              <div>
                <div className="mono-eyebrow" style={{ fontSize: "11px" }}>PUBLISHED YEAR</div>
                <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                  {standard.year_published}
                </div>
              </div>
            )}
            {standard.sub_group && (
              <div>
                <div className="mono-eyebrow" style={{ fontSize: "11px" }}>SUB-CATEGORY</div>
                <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                  {standard.sub_group}
                </div>
              </div>
            )}
            <div>
              <div className="mono-eyebrow" style={{ fontSize: "11px" }}>CERTIFICATION</div>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}>
                {standard.certification === "none" ? "Recommended" : standard.certification.toUpperCase().replace(/_/g, " ")}
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
        {standard.scope && (
          <div className="card" style={{ marginBottom: "var(--space-xl)" }}>
            <SectionEyebrow>OFFICIAL SCOPE & ABSTRACT</SectionEyebrow>
            <h2 className="heading-md" style={{ marginBottom: "var(--space-sm)" }}>
              Standard Overview
            </h2>
            <p className="body-lg" style={{ color: "var(--color-body)", lineHeight: "26px", marginBottom: "var(--space-md)" }}>
              {standard.scope}
            </p>
          </div>
        )}

        {/* Cross-Reference Network */}
        <div className="card" style={{ marginBottom: "var(--space-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
            <div>
              <SectionEyebrow>GRAPH TOPOLOGY</SectionEyebrow>
              <h2 className="heading-md">Interlinked Indian Standards Network</h2>
            </div>
            <span className="badge badge-blue">RECURSIVE GRAPH CTE ACTIVE</span>
          </div>

          <p className="body-md" style={{ marginBottom: "var(--space-md)" }}>
            Under Indian public procurement regulations, citing {standard.is_number} implicitly binds contractor
            compliance with all referenced testing methods and sub-assembly codes:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {crossRefEntries.length > 0 ? (
              crossRefEntries.map((cr, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px var(--space-md)", backgroundColor: "var(--color-canvas)",
                    border: "1px solid var(--color-hairline)", borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Network size={16} style={{ color: "var(--color-link)" }} />
                    <Link
                      href={`/standards/${encodeURIComponent(cr.is_number)}`}
                      style={{ fontWeight: 600, fontSize: "14px", color: "var(--color-ink)" }}
                    >
                      {cr.is_number}
                    </Link>
                  </div>
                  <span className="badge">{cr.relation_type}</span>
                </div>
              ))
            ) : (
              <div className="body-sm">No secondary cross-references recorded.</div>
            )}
          </div>
        </div>

        {/* Source URL */}
        {standard.source_url && (
          <div className="card">
            <SectionEyebrow>DOCUMENT SOURCE</SectionEyebrow>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
              <FileText size={16} style={{ color: "var(--color-link)" }} />
              <a
                href={standard.source_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "14px", color: "var(--color-link)", fontWeight: 500 }}
              >
                View Original Document →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
