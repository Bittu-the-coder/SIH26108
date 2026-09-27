"use client";

import React, { useState } from "react";
import { SectionEyebrow } from "@/components/atoms/SectionEyebrow";
import { Badge } from "@/components/atoms/Badge";
import { Key, Copy, Check, Shield, User, Globe, Save } from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("bis_live_9f824e819b48c710d48");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: "var(--space-2xl) 0 var(--space-4xl)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ marginBottom: "var(--space-2xl)" }}>
          <SectionEyebrow>DEPARTMENTAL CONFIGURATION</SectionEyebrow>
          <h1 className="heading-lg" style={{ color: "var(--color-ink)", marginBottom: "8px" }}>
            Account & Developer Settings
          </h1>
          <p className="body-md">
            Manage your organization profile, e-procurement integrations, and developer API keys.
          </p>
        </div>

        {/* Section 1: API Keys */}
        <div className="card" style={{ marginBottom: "var(--space-xl)", padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-md)", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Key size={16} style={{ color: "var(--color-link)" }} />
                <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-ink)" }}>
                  REST API Key
                </h2>
              </div>
              <p className="body-sm">
                Authenticate server-to-server requests to `/api/v1/recommend` from your departmental ERP.
              </p>
            </div>
            <Badge variant="green">ACTIVE</Badge>
          </div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "var(--space-sm)" }}>
            <input
              type="text"
              readOnly
              value={apiKey}
              className="text-input"
              style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
            />
            <button
              onClick={handleCopy}
              className="btn-ghost-sm"
              style={{ height: "42px", padding: "0 16px", flexShrink: 0 }}
            >
              {copied ? <Check size={14} style={{ color: "var(--color-success)" }} /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <p className="body-sm" style={{ fontSize: "11px", color: "var(--color-mute)" }}>
            Rate limit: 1,000 requests/minute. For high-volume GeM batch publishing, contact administration.
          </p>
        </div>

        {/* Section 2: Department Profile Form */}
        <div className="card" style={{ padding: "var(--space-xl)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "var(--space-lg)" }}>
            <User size={16} style={{ color: "var(--color-primary)" }} />
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-ink)" }}>
              Procurement Officer Profile
            </h2>
          </div>

          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-md)" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                  Officer Name
                </label>
                <input type="text" defaultValue="Er. Rajesh Kumar" className="text-input" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                  Designation
                </label>
                <input type="text" defaultValue="Superintending Engineer" className="text-input" />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Department / Organization
              </label>
              <input type="text" defaultValue="Central Public Works Department (CPWD), Northern Zone" className="text-input" />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                Primary Engineering Domain
              </label>
              <select className="text-input" style={{ backgroundColor: "var(--color-canvas-elevated)" }}>
                <option>Civil Engineering & Construction (CED)</option>
                <option>Electrotechnical & Electrical Fittings (ETD)</option>
                <option>Mechanical & Furniture (MED)</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--space-sm)" }}>
              <button type="submit" className="btn-primary-sm" style={{ height: "38px", padding: "0 18px" }}>
                {saved ? <Check size={14} style={{ marginRight: "4px" }} /> : <Save size={14} style={{ marginRight: "4px" }} />}
                <span>{saved ? "Saved Successfully!" : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
