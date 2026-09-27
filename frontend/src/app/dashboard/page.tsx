"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Badge } from "@/components/atoms/Badge";
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Clock,
  Layers,
  FileCheck2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { history, setSearchQuery } = useAppStore();

  const gazettedUpdates = [
    {
      code: "IS 1786:2008 (Amd 3)",
      title: "High Strength Deformed Steel Bars - Seismic Ductility Amendment",
      date: "Gazetted Sept 2026",
      category: "Civil Engineering",
      isNew: true,
    },
    {
      code: "IS 456:2000 (Rev 5 Draft)",
      title: "Plain and Reinforced Concrete - Supplementary Durability Exposure Classes",
      date: "Under Public Review",
      category: "Civil Engineering",
      isNew: false,
    },
    {
      code: "IS 694:2010",
      title: "PVC Insulated Cables - Mandatory FRLS Flame Retardant Re-certification",
      date: "Compliance Circular",
      category: "Electrotechnical",
      isNew: true,
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Welcome & Top Notification Banner */}
      <div
        className="card"
        style={{
          padding: "var(--space-xl)",
          marginBottom: "var(--space-xl)",
          background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span className="badge badge-green">CPWD NORTHERN ZONE</span>
            <span className="body-sm" style={{ fontSize: "11px" }}>NIC Session Active</span>
          </div>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "4px" }}>
            Welcome back, Er. Rajesh Kumar
          </h1>
          <p className="body-md" style={{ maxWidth: "600px" }}>
            AI Recommendation Engine is running with hybrid BGE-M3 dense embeddings and pgvector cross-reference graphs.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/recommend" className="btn-primary" style={{ height: "42px" }}>
            <Sparkles size={15} />
            <span>Launch Spec Analyzer</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid-4" style={{ marginBottom: "var(--space-xl)" }}>
        <div className="card" style={{ padding: "var(--space-lg)" }}>
          <div className="mono-eyebrow" style={{ color: "var(--color-link)" }}>INDEXED CODES</div>
          <div className="display-xl" style={{ fontSize: "32px", margin: "6px 0 2px", color: "var(--color-ink)" }}>
            2,415
          </div>
          <p className="body-sm">Indian Standards across CED, ETD, MED, TXD</p>
        </div>

        <div className="card" style={{ padding: "var(--space-lg)" }}>
          <div className="mono-eyebrow" style={{ color: "var(--color-success)" }}>TOP-3 ACCURACY</div>
          <div className="display-xl" style={{ fontSize: "32px", margin: "6px 0 2px", color: "var(--color-ink)" }}>
            94.2%
          </div>
          <p className="body-sm">Benchmark hit-rate across verified tenders</p>
        </div>

        <div className="card" style={{ padding: "var(--space-lg)" }}>
          <div className="mono-eyebrow" style={{ color: "var(--color-violet)" }}>P95 LATENCY</div>
          <div className="display-xl" style={{ fontSize: "32px", margin: "6px 0 2px", color: "var(--color-ink)" }}>
            142 ms
          </div>
          <p className="body-sm">Hybrid RRF retrieval + Graph expansion</p>
        </div>

        <div className="card" style={{ padding: "var(--space-lg)" }}>
          <div className="mono-eyebrow" style={{ color: "var(--color-warning-deep)" }}>MANDATORY CODES</div>
          <div className="display-xl" style={{ fontSize: "32px", margin: "6px 0 2px", color: "var(--color-ink)" }}>
            840+
          </div>
          <p className="body-sm">Gazetted under BIS Act 2016 regulations</p>
        </div>
      </div>

      {/* Main 2-Column Section: Left is Recent Audits, Right is BIS Gazetted Updates */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "var(--space-xl)", alignItems: "start" }}>
        {/* Left Column: Recent Queries & Quick Actions */}
        <div>
          <div className="card" style={{ padding: "var(--space-xl)", marginBottom: "var(--space-xl)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
              <div>
                <SectionEyebrow>RECENT TENDER SPEC ANALYSES</SectionEyebrow>
                <h2 className="heading-md">Query Audit History</h2>
              </div>
              <Link href="/history" className="btn-ghost-sm" style={{ fontSize: "12px", height: "30px" }}>
                <span>View Full Log</span>
                <ArrowRight size={12} style={{ marginLeft: "4px" }} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {history.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: "12px 14px",
                    backgroundColor: "var(--color-canvas)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <Badge variant="default">{item.category}</Badge>
                      <span className="body-sm" style={{ fontSize: "11px" }}>{item.timestamp}</span>
                    </div>
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.query}
                    </p>
                    <div className="body-sm" style={{ fontSize: "12px", marginTop: "2px" }}>
                      Top match: <strong style={{ color: "var(--color-ink)" }}>{item.top_standard}</strong>
                    </div>
                  </div>

                  <Link
                    href="/recommend"
                    onClick={() => setSearchQuery(item.query)}
                    className="btn-ghost-sm"
                    style={{ height: "30px", fontSize: "11px", padding: "0 10px", flexShrink: 0 }}
                  >
                    <RotateCcw size={12} style={{ marginRight: "4px" }} />
                    <span>Re-test</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid-2">
            <Link href="/standards" className="card" style={{ display: "block", padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <BookOpen size={18} style={{ color: "var(--color-ink)" }} />
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-ink)" }}>Search Standards Catalog</h3>
              </div>
              <p className="body-sm">Directly search 2,400+ Indian codes with keywords, clauses, and division filters.</p>
            </Link>

            <Link href="/admin/eval" className="card" style={{ display: "block", padding: "var(--space-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <TrendingUp size={18} style={{ color: "var(--color-success)" }} />
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-ink)" }}>Accuracy Benchmarks</h3>
              </div>
              <p className="body-sm">View Hit-Rate @ 1/3/5, MRR scores, and ablation testing comparison tables.</p>
            </Link>
          </div>
        </div>

        {/* Right Column: Latest BIS Technical Circulars */}
        <div className="card" style={{ padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
            <div>
              <SectionEyebrow>OFFICIAL GAZETTE ALERTS</SectionEyebrow>
              <h2 className="heading-md">BIS Code Updates</h2>
            </div>
            <span className="badge badge-blue">SEPT 2026</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {gazettedUpdates.map((upd, idx) => (
              <div
                key={idx}
                style={{
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-hairline)",
                  backgroundColor: "var(--color-canvas)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-ink)" }}>
                    {upd.code}
                  </span>
                  {upd.isNew && <Badge variant="warning">NEW</Badge>}
                </div>
                <div style={{ fontSize: "12px", fontWeight: 500, color: "var(--color-body)", marginBottom: "6px" }}>
                  {upd.title}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="body-sm" style={{ fontSize: "11px" }}>{upd.date}</span>
                  <Link href="/standards" style={{ fontSize: "11px", color: "var(--color-link)", fontWeight: 500 }}>
                    Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-lg)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--color-hairline)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={16} style={{ color: "var(--color-success)" }} />
              <span className="body-sm" style={{ fontSize: "12px", color: "var(--color-body)" }}>
                Verified against official Bureau of Indian Standards (services.bis.gov.in) daily gazettes.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
