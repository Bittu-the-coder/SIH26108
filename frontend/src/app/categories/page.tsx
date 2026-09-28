import React from "react";
import Link from "next/link";
import { MOCK_CATEGORIES } from "@/lib/mockData";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { ArrowRight, Building2, Zap, Armchair, ShieldAlert } from "lucide-react";

export default function CategoriesPage() {
  const getIcon = (code: string) => {
    switch (code) {
      case "CED":
        return <Building2 size={24} style={{ color: "var(--color-ink)" }} />;
      case "ETD":
        return <Zap size={24} style={{ color: "var(--color-link)" }} />;
      case "MED":
        return <Armchair size={24} style={{ color: "var(--color-violet)" }} />;
      default:
        return <ShieldAlert size={24} style={{ color: "var(--color-warning-deep)" }} />;
    }
  };

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container">
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <SectionEyebrow>BUREAU OF INDIAN STANDARDS CLASSIFICATION</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            Standards Domains & Division Councils
          </h1>
          <p className="body-md" style={{ maxWidth: "700px" }}>
            The Bureau of Indian Standards organizes all national codes under technical division councils.
            Our engine indexes and maps specifications across key procurement verticals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "var(--space-xl)" }}>
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "var(--space-xl)",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-md)" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--color-canvas)",
                      border: "1px solid var(--color-hairline)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {getIcon(cat.code)}
                  </div>
                  <span className="badge">{cat.code} DIVISION</span>
                </div>

                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-ink)", marginBottom: "4px" }}>
                  {cat.name}
                </h2>
                <div style={{ fontSize: "14px", color: "var(--color-mute)", marginBottom: "var(--space-md)" }}>
                  {cat.name_hindi}
                </div>

                <p className="body-sm" style={{ color: "var(--color-body)", marginBottom: "var(--space-lg)", lineHeight: "22px" }}>
                  {cat.description}
                </p>

                <div style={{ marginBottom: "var(--space-lg)" }}>
                  <div className="mono-eyebrow" style={{ fontSize: "11px", marginBottom: "6px" }}>KEY SUBCATEGORIES</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {cat.subcategories.map((sub, i) => (
                      <span key={i} className="badge" style={{ fontSize: "11px" }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "var(--space-md)",
                  borderTop: "1px solid var(--color-hairline)",
                }}
              >
                <span className="badge badge-blue">{cat.standard_count} Indexed Codes</span>
                <Link
                  href={`/standards?category=${encodeURIComponent(cat.name)}`}
                  className="btn-primary-sm"
                >
                  <span>Explore Codes</span>
                  <ArrowRight size={13} style={{ marginLeft: "4px" }} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
