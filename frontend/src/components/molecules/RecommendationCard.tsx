"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Recommendation, DemoRecommendation, FeedbackType } from "@/lib/types";
import { Badge } from "../atoms/Badge";
import { useAppStore } from "@/lib/store";
import { submitFeedback } from "@/lib/api";
import {
  CheckCircle2,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Network,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

interface RecommendationCardProps {
  item: Recommendation;
  index: number;
  queryId: string;
  isDemo?: boolean;
}

export function RecommendationCard({ item, index, queryId, isDemo }: RecommendationCardProps) {
  const { language } = useAppStore();
  const [feedbackGiven, setFeedbackGiven] = useState<string | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Demo-enriched fields (only present in demo mode)
  const demoItem = item as DemoRecommendation;
  const hasDemoExtras = isDemo && (demoItem.matched_clauses || demoItem.compliance_actions);

  const confidencePercent = Math.round((item.confidence ?? 0.85) * 100);
  const isMandatory = item.certification?.mandatory === true;

  const handleFeedback = async (type: FeedbackType) => {
    setFeedbackGiven(type);
    setFeedbackError(null);
    try {
      await submitFeedback({
        query_id: queryId,
        feedback: type,
      });
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : "Feedback failed");
    }
  };

  return (
    <div className="card" style={{ marginBottom: "var(--space-lg)", maxWidth: "100%", boxSizing: "border-box", overflow: "hidden", wordBreak: "break-word" }}>
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
            {index + 1}
          </span>
          <Link
            href={`/standards/${encodeURIComponent(item.is_number)}`}
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
            <span>{item.is_number}</span>
            <ExternalLink size={14} style={{ color: "var(--color-mute)" }} />
          </Link>
          {isMandatory && <Badge variant="warning">MANDATORY</Badge>}
          <Badge variant="default">{item.status ?? "current"}</Badge>
        </div>

        {/* Confidence Metric */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "right", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", lineHeight: 1.2 }}>
              {confidencePercent}% Match
            </div>
            <div className="body-sm" style={{ fontSize: "11px", color: "var(--color-mute)" }}>Confidence</div>
          </div>
          <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
            <svg width="40" height="40" viewBox="0 0 40 40" style={{ display: "block" }}>
              <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-hairline)" strokeWidth="3.5" />
              <circle
                cx="20" cy="20" r="16" fill="none"
                stroke="var(--color-link)" strokeWidth="3.5"
                strokeDasharray={100.53}
                strokeDashoffset={100.53 - (100.53 * confidencePercent) / 100}
                strokeLinecap="round"
                transform="rotate(-90 20 20)"
                style={{ transition: "stroke-dashoffset 0.4s ease" }}
              />
              <text x="20" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-ink)" fontFamily="var(--font-sans)">
                {confidencePercent}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "4px", letterSpacing: "-0.2px" }}>
        {item.title}
      </h3>

      {/* Supersession warning */}
      {item.supersession && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 12px", backgroundColor: "#fff8e1", border: "1px solid #ffe082", borderRadius: "var(--radius-sm)", marginBottom: "var(--space-md)", fontSize: "13px" }}>
          <AlertCircle size={14} style={{ color: "#e65100" }} />
          <span style={{ color: "#e65100" }}>Supersession: {item.supersession}</span>
        </div>
      )}

      {/* Match Reason */}
      {item.match_reason && (
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
            {language === "hi" && demoItem.explanation_hindi ? demoItem.explanation_hindi : item.match_reason}
          </p>
        </div>
      )}

      {/* Certification Info */}
      {item.certification && item.certification.scheme && item.certification.scheme !== "none" && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "var(--space-md)", fontSize: "13px" }}>
          <CheckCircle2 size={14} style={{ color: "var(--color-success)" }} />
          <span style={{ fontWeight: 500, color: "var(--color-ink)" }}>
            Certification: {item.certification.scheme.toUpperCase().replace("_", " ")}
          </span>
          {item.certification.details && (
            <span className="body-sm" style={{ color: "var(--color-mute)" }}>
              — {item.certification.details}
            </span>
          )}
        </div>
      )}

      {/* Demo-only: Matched Clauses */}
      {hasDemoExtras && demoItem.matched_clauses && demoItem.matched_clauses.length > 0 && (
        <div style={{ marginBottom: "var(--space-md)" }}>
          <div className="mono-eyebrow" style={{ marginBottom: "6px" }}>MATCHED RELEVANT CLAUSES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {demoItem.matched_clauses.map((clause, idx) => (
              <div key={idx} style={{ padding: "8px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-hairline)", backgroundColor: "var(--color-canvas-elevated)", fontSize: "13px" }}>
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

      {/* Demo-only: Compliance Actions */}
      {hasDemoExtras && demoItem.compliance_actions && demoItem.compliance_actions.length > 0 && (
        <div style={{ marginBottom: "var(--space-md)" }}>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
              padding: "8px 12px", backgroundColor: "var(--color-hairline-soft)", borderRadius: "var(--radius-sm)",
              fontSize: "13px", fontWeight: 500, color: "var(--color-ink)", cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={15} style={{ color: "var(--color-success)" }} />
              <span>Procurement Compliance Checklist ({demoItem.compliance_actions.length} items)</span>
            </div>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isExpanded && (
            <div style={{ marginTop: "8px", padding: "12px", border: "1px solid var(--color-hairline)", borderRadius: "var(--radius-sm)", display: "flex", flexDirection: "column", gap: "8px" }}>
              {demoItem.compliance_actions.map((act, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px" }}>
                  <span style={{ color: "var(--color-success)", marginTop: "2px" }}>✓</span>
                  <span style={{ color: "var(--color-body)" }}>{act}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Allied Standards */}
      <div
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: "var(--space-sm)", borderTop: "1px solid var(--color-hairline)", flexWrap: "wrap", gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {item.allied_standards && item.allied_standards.length > 0 ? (
            <>
              <Network size={13} style={{ color: "var(--color-mute)" }} />
              <span className="body-sm">Allied:</span>
              {item.allied_standards.map((allied, idx) => (
                <Link
                  key={idx}
                  href={`/standards/${encodeURIComponent(allied.is_number)}`}
                  style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-link)", textDecoration: "underline" }}
                  title={allied.reason || allied.relationship || ""}
                >
                  {allied.is_number}
                </Link>
              ))}
            </>
          ) : (
            <span className="body-sm">Primary reference standard</span>
          )}
        </div>

        {/* Feedback */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {feedbackError && (
            <span className="body-sm" style={{ color: "var(--color-error)", fontSize: "11px" }}>{feedbackError}</span>
          )}
          <span className="body-sm" style={{ fontSize: "12px" }}>Accurate?</span>
          <button
            onClick={() => handleFeedback("thumbs_up")}
            disabled={feedbackGiven !== null}
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px",
              borderRadius: "var(--radius-sm)", border: "1px solid var(--color-hairline)",
              backgroundColor: feedbackGiven === "thumbs_up" ? "#e6f7ec" : "var(--color-canvas-elevated)",
              color: feedbackGiven === "thumbs_up" ? "#0e8a38" : "var(--color-body)",
              fontSize: "12px", cursor: feedbackGiven === null ? "pointer" : "default",
            }}
          >
            <ThumbsUp size={13} /> Yes
          </button>
          <button
            onClick={() => handleFeedback("thumbs_down")}
            disabled={feedbackGiven !== null}
            style={{
              display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px",
              borderRadius: "var(--radius-sm)", border: "1px solid var(--color-hairline)",
              backgroundColor: feedbackGiven === "thumbs_down" ? "#ffebe6" : "var(--color-canvas-elevated)",
              color: feedbackGiven === "thumbs_down" ? "var(--color-error)" : "var(--color-body)",
              fontSize: "12px", cursor: feedbackGiven === null ? "pointer" : "default",
            }}
          >
            <ThumbsDown size={13} /> No
          </button>
        </div>
      </div>
    </div>
  );
}
