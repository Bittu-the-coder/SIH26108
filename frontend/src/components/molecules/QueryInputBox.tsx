"use client";

import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { getRecommendations } from "@/lib/api";
import { Button } from "../atoms/Button";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

const SAMPLE_PROMPTS = [
  {
    label: "Civil: TMT Bars & Cement",
    text: "Supply and installation of Fe 500D TMT reinforcement steel bars and OPC 53 Grade cement for multi-storey residential RCC construction conforming to earthquake safety.",
  },
  {
    label: "Electrical: FRLS Cables",
    text: "Supply of 1100V grade 4-core copper conductor FRLS PVC insulated armored cables for industrial distribution substation.",
  },
  {
    label: "Furniture: Office Chairs",
    text: "Procurement of ergonomic high-back revolving chairs with adjustable lumbar support, hydraulic gas lift, and synchro-tilt mechanism for central government office.",
  },
  {
    label: "हिन्दी: निर्माण सीमेंट और सरिया",
    text: "भूकंप रोधी बहुमंजिला आवासीय निर्माण के लिए Fe 500D स्टील सरिया और 53 ग्रेड साधारण पोर्टलैंड सीमेंट की आपूर्ति।",
  }
];

export function QueryInputBox() {
  const {
    searchQuery,
    setSearchQuery,
    language,
    setCurrentResult,
    isLoading,
    setIsLoading,
    addHistoryItem,
  } = useAppStore();

  const [inputVal, setInputVal] = useState(searchQuery);

  const handleAnalyze = async () => {
    if (!inputVal.trim()) return;
    setIsLoading(true);
    setSearchQuery(inputVal);

    try {
      const res = await getRecommendations(inputVal, language);
      setCurrentResult(res);
      addHistoryItem({
        id: `hist-${Date.now()}`,
        query: inputVal,
        timestamp: "Just now",
        recommendation_count: res.recommendations.length,
        top_standard: res.recommendations[0]?.standard.standard_number || "None",
        category: res.detected_category,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-canvas-elevated)",
        border: "1px solid var(--color-hairline)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-lg)",
        boxShadow: "var(--shadow-whisper)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xs)" }}>
        <label
          htmlFor="tender-spec-input"
          style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.2px" }}
        >
          Procurement Technical Specification or Tender Clause
        </label>
        <span className="mono-eyebrow" style={{ fontSize: "11px" }}>
          FREE-TEXT / UNSTRUCTURED / BILINGUAL (EN/HI)
        </span>
      </div>

      <textarea
        id="tender-spec-input"
        className="text-area"
        rows={4}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder="e.g. Supply and delivery of 1100V grade 3-core copper conductor FRLS insulated power cables for underground metro tunnel illumination..."
        style={{
          fontSize: "14px",
          lineHeight: "22px",
          marginBottom: "var(--space-md)",
        }}
      />

      {/* Sample Template Pills */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "var(--space-md)" }}>
        <span className="body-sm" style={{ fontSize: "12px", color: "var(--color-mute)" }}>Quick Templates:</span>
        {SAMPLE_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setInputVal(p.text)}
            style={{
              padding: "3px 10px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--color-hairline-soft)",
              border: "1px solid var(--color-hairline)",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--color-body)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Action Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div className="body-sm" style={{ fontSize: "12px" }}>
          Supports tender specifications, GeM descriptions, and Indian Railways/CPWD schedules.
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !inputVal.trim()}
          className="btn-primary"
          style={{
            height: "40px",
            padding: "0 18px",
            fontSize: "14px",
            opacity: isLoading || !inputVal.trim() ? 0.7 : 1,
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Analyzing Standards...</span>
            </>
          ) : (
            <>
              <Sparkles size={15} />
              <span>Identify Applicable Standards</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
