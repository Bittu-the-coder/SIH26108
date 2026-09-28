"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Badge } from "@/components/atoms/Badge";
import { History, ArrowRight, RotateCcw, Clock } from "lucide-react";

export default function HistoryPage() {
  const router = useRouter();
  const { history, setSearchQuery } = useAppStore();

  const handleRerun = (query: string) => {
    setSearchQuery(query);
    router.push("/recommend");
  };

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <SectionEyebrow>PROCUREMENT AUDIT TRAIL</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            Query & Analysis History
          </h1>
          <p className="body-md">
            Review past technical specification evaluations conducted in your session. Re-run queries or inspect
            historical standard matches.
          </p>
        </div>

        {/* History List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                  padding: "var(--space-lg)",
                }}
              >
                <div style={{ flex: 1, minWidth: "280px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <Badge variant="blue">{item.detected_language === "hi" ? "हिन्दी" : "English"}</Badge>
                    <span className="body-sm" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} /> {item.timestamp}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "4px" }}>
                    {item.query}
                  </h3>
                  <div className="body-sm">
                    Top Code: <strong style={{ color: "var(--color-ink)" }}>{item.top_standard}</strong> ({item.recommendation_count} standards matched)
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleRerun(item.query)}
                    className="btn-primary-sm"
                    style={{ height: "34px", padding: "0 12px" }}
                  >
                    <RotateCcw size={13} style={{ marginRight: "4px" }} />
                    <span>Re-analyze</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="card" style={{ padding: "var(--space-3xl)", textAlign: "center" }}>
              <History size={32} style={{ color: "var(--color-mute)", margin: "0 auto var(--space-md)" }} />
              <h3 className="heading-md" style={{ marginBottom: "8px" }}>No Queries Recorded Yet</h3>
              <p className="body-md" style={{ marginBottom: "var(--space-lg)" }}>
                Analyze a tender specification to build your audit history.
              </p>
              <Link href="/recommend" className="btn-primary">
                <span>Go to Spec Analyzer</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
