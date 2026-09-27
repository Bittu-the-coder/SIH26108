"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RecommendationItem } from "@/lib/types";
import { Badge } from "../atoms/Badge";
import { useAppStore } from "@/lib/store";
import { submitFeedback } from "@/lib/api";
import {
  CheckCircle2,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Network,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface RecommendationCardProps {
  item: RecommendationItem;
  queryId: string;
}

export function RecommendationCard({ item, queryId }: RecommendationCardProps) {
  const { language } = useAppStore();
  const [feedbackGiven, setFeedbackGiven] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { standard, confidence_score, relevance_rank, explanation, explanation_hindi, matched_clauses, compliance_actions } = item;

  const handleRating = async (rating: number) => {
    setFeedbackGiven(rating);
    await submitFeedback({
      query_id: queryId,
      standard_id: standard.id,
      rating,
      comment: commentText || undefined,
    });
  };

  const confidencePercent = Math.round(confidence_score * 100);

  return (
    <div className="card" style={{ marginBottom: "var(--space-lg)" }}>
      {/* Top Header: Rank, Standard Code, Confidence & Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "var(--space-sm)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            {relevance_rank}
          </span>
          <Link
            href={`/standards/${standard.id}`}
            style={{
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.4px",
              color: "var(--color-ink)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>{standard.standard_number}</span>
            <ExternalLink size={14} style={{ color: "var(--color-mute)" }} />
          </Link>
          {standard.mandatory_status && (
            <Badge variant="warning">MANDATORY CITATION</Badge>
          )}
          <Badge variant="default">{standard.category}</Badge>
        </div>

        {/* Confidence Metric: True Geometric Circle Gauge */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "right", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", lineHeight: 1.2 }}>
              {confidencePercent}% Match
            </div>
            <div className="body-sm" style={{ fontSize: "11px", color: "var(--color-mute)" }}>RRF Score</div>
          </div>
          <div style={{ width: "40px", height: "40px", flexShrink: 0, position: "relative" }}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              style={{ flexShrink: 0, display: "block" }}
            >
              {/* Background Track Circle */}
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="var(--color-hairline)"
                strokeWidth="3.5"
              />
              {/* Active Progress Arc */}
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="var(--color-link)"
                strokeWidth="3.5"
                strokeDasharray={100.53}
                strokeDashoffset={100.53 - (100.53 * confidencePercent) / 100}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
              {/* Value in Center */}
              <text
                x="20"
                y="24"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--color-ink)"
                fontFamily="var(--font-sans)"
              >
                {confidencePercent}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Standard Title */}
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--color-ink)",
          marginBottom: "4px",
          letterSpacing: "-0.2px",
        }}
      >
        {language === "hi" && standard.title_hindi ? standard.title_hindi : standard.title}
      </h3>
      {language === "en" && standard.title_hindi && (
        <p className="body-sm" style={{ color: "var(--color-mute)", marginBottom: "var(--space-md)" }}>
          {standard.title_hindi}
        </p>
      )}

      {/* AI Explanation / Rationale */}
      <div
        style={{
          padding: "var(--space-md)",
          backgroundColor: "var(--color-canvas)",
          border: "1px solid var(--color-hairline)",
          borderRadius: "var(--radius-sm)",
          marginBottom: "var(--space-md)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <FileText size={14} style={{ color: "var(--color-link)" }} />
          <span style={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-ink)" }}>
            Recommendation Rationale
          </span>
        </div>
        <p className="body-md" style={{ color: "var(--color-body)", lineHeight: "22px" }}>
          {language === "hi" && explanation_hindi ? explanation_hindi : explanation}
        </p>
      </div>

      {/* Matched Specific Clauses */}
      {matched_clauses && matched_clauses.length > 0 && (
        <div style={{ marginBottom: "var(--space-md)" }}>
          <div className="mono-eyebrow" style={{ marginBottom: "6px" }}>MATCHED RELEVANT CLAUSES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {matched_clauses.map((clause, idx) => (
              <div
                key={idx}
                style={{
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-hairline)",
                  backgroundColor: "var(--color-canvas-elevated)",
                  fontSize: "13px",
                }}
              >
                <div style={{ fontWeight: 600, color: "var(--color-ink)", marginBottom: "2px" }}>
                  {clause.clause_number} — {clause.clause_title}
                </div>
                <div className="body-sm" style={{ color: "var(--color-body)", fontStyle: "italic" }}>
                  &quot;{clause.snippet}&quot;
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible Compliance Checklist & Actions */}
      {compliance_actions && compliance_actions.length > 0 && (
        <div style={{ marginBottom: "var(--space-md)" }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "8px 12px",
              backgroundColor: "var(--color-hairline-soft)",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--color-ink)",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={15} style={{ color: "var(--color-success)" }} />
              <span>Procurement Compliance Checklist ({compliance_actions.length} items)</span>
            </div>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isExpanded && (
            <div
              style={{
                marginTop: "8px",
                padding: "12px",
                border: "1px solid var(--color-hairline)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {compliance_actions.map((act, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px" }}>
                  <span style={{ color: "var(--color-success)", marginTop: "2px" }}>✓</span>
                  <span style={{ color: "var(--color-body)" }}>{act}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Card Footer: Cross References, Feedback Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "var(--space-sm)",
          borderTop: "1px solid var(--color-hairline)",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {/* Cross references pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {standard.cross_references && standard.cross_references.length > 0 ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Network size={13} style={{ color: "var(--color-mute)" }} />
              <span className="body-sm">References:</span>
              {standard.cross_references.map((cr, idx) => (
                <Link
                  key={idx}
                  href={`/standards/${cr.standard_id}`}
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var(--color-link)",
                    textDecoration: "underline",
                  }}
                >
                  {cr.standard_number}
                </Link>
              ))}
            </div>
          ) : (
            <span className="body-sm">Primary reference standard</span>
          )}
        </div>

        {/* Feedback Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span className="body-sm" style={{ fontSize: "12px" }}>Accurate match?</span>
          <button
            onClick={() => handleRating(1)}
            disabled={feedbackGiven !== null}
            title="Relevant & accurate recommendation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-hairline)",
              backgroundColor: feedbackGiven === 1 ? "#e6f7ec" : "var(--color-canvas-elevated)",
              color: feedbackGiven === 1 ? "#0e8a38" : "var(--color-body)",
              fontSize: "12px",
              cursor: feedbackGiven === null ? "pointer" : "default",
            }}
          >
            <ThumbsUp size={13} />
            <span>Yes</span>
          </button>
          <button
            onClick={() => handleRating(-1)}
            disabled={feedbackGiven !== null}
            title="Irrelevant or inaccurate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-hairline)",
              backgroundColor: feedbackGiven === -1 ? "#ffebe6" : "var(--color-canvas-elevated)",
              color: feedbackGiven === -1 ? "var(--color-error)" : "var(--color-body)",
              fontSize: "12px",
              cursor: feedbackGiven === null ? "pointer" : "default",
            }}
          >
            <ThumbsDown size={13} />
            <span>No</span>
          </button>
        </div>
      </div>
    </div>
  );
}
