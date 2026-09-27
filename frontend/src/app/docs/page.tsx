import React from "react";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Badge } from "@/components/atoms/Badge";
import { Terminal, Code, Layers, FileCode, Check } from "lucide-react";

export default function DocsPage() {
  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <SectionEyebrow>DEVELOPER & INTEGRATION DOCUMENTATION</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            BIS Intelligence API Reference
          </h1>
          <p className="body-md">
            Integrate the Indian Standards recommendation engine directly into e-procurement portals,
            ERP tender management systems, or GeM catalog publishing workflows.
          </p>
        </div>

        {/* Section 1: POST /api/v1/recommend */}
        <div className="card" style={{ marginBottom: "var(--space-xl)", padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-sm)" }}>
            <span
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
                padding: "2px 8px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              POST
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "16px", color: "var(--color-ink)" }}>
              /api/v1/recommend
            </span>
            <Badge variant="blue">Core Endpoint</Badge>
          </div>

          <p className="body-md" style={{ marginBottom: "var(--space-md)" }}>
            Accepts free-form technical specifications or tender clauses in English or Hindi and returns ranked Indian Standards
            with confidence scores, matched clauses, and actionable compliance items.
          </p>

          <div className="mono-eyebrow" style={{ marginBottom: "6px" }}>REQUEST PAYLOAD (JSON)</div>
          <pre className="code-box" style={{ marginBottom: "var(--space-md)" }}>
{`{
  "query": "Supply of Fe 500D TMT reinforcement bars and OPC 53 Grade cement for earthquake resilient RCC construction.",
  "language": "en",
  "category_hint": "Civil Engineering & Construction",
  "top_k": 5
}`}
          </pre>

          <div className="mono-eyebrow" style={{ marginBottom: "6px" }}>RESPONSE PAYLOAD (JSON 200 OK)</div>
          <pre className="code-box">
{`{
  "query_id": "qry-8f4b-2901",
  "detected_category": "Civil Engineering & Construction",
  "execution_time_ms": 142,
  "recommendations": [
    {
      "standard": {
        "standard_number": "IS 456:2000",
        "title": "Plain and Reinforced Concrete - Code of Practice",
        "mandatory_status": true
      },
      "confidence_score": 0.96,
      "relevance_rank": 1,
      "explanation": "Mandatory foundational design and execution code for all structural RCC works.",
      "matched_clauses": [
        {
          "clause_number": "Clause 5.1 & 5.6",
          "clause_title": "Cement & Reinforcement Materials"
        }
      ],
      "compliance_actions": [
        "Include mandatory compliance certification with IS 456 in tender clause 4.2",
        "Mandate minimum 28-day compressive cube testing with NABL accredited lab"
      ]
    }
  ]
}`}
          </pre>
        </div>

        {/* Section 2: Standards Lookup API */}
        <div className="card" style={{ marginBottom: "var(--space-xl)", padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-sm)" }}>
            <span
              style={{
                backgroundColor: "#0e8a38",
                color: "#ffffff",
                padding: "2px 8px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              GET
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "16px", color: "var(--color-ink)" }}>
              /api/v1/standards?category=CED&q=concrete
            </span>
          </div>
          <p className="body-md">
            Query the verified Indian Standards database with filters for division councils, publication year, and keywords.
          </p>
        </div>

        {/* Section 3: Feedback Loop API */}
        <div className="card" style={{ padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "var(--space-sm)" }}>
            <span
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-on-primary)",
                padding: "2px 8px",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: "12px",
              }}
            >
              POST
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "16px", color: "var(--color-ink)" }}>
              /api/v1/feedback
            </span>
          </div>
          <p className="body-md">
            Captures officer ratings (+1 / -1) and missing standard recommendations to continually train the retrieval re-ranker.
          </p>
        </div>
      </div>
    </div>
  );
}
