"use client";

import React from "react";
import { useAppStore } from "@/lib/store";

export function LanguageToggle() {
  const { language, setLanguage } = useAppStore();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: "var(--color-hairline-soft)",
        padding: "2px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--color-hairline)",
      }}
    >
      <button
        onClick={() => setLanguage("en")}
        style={{
          padding: "2px 8px",
          fontSize: "12px",
          fontWeight: 500,
          borderRadius: "var(--radius-pill)",
          backgroundColor: language === "en" ? "var(--color-canvas-elevated)" : "transparent",
          color: language === "en" ? "var(--color-ink)" : "var(--color-mute)",
          boxShadow: language === "en" ? "var(--shadow-whisper)" : "none",
          transition: "all 0.15s ease",
          cursor: "pointer",
        }}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("hi")}
        style={{
          padding: "2px 8px",
          fontSize: "12px",
          fontWeight: 500,
          borderRadius: "var(--radius-pill)",
          backgroundColor: language === "hi" ? "var(--color-canvas-elevated)" : "transparent",
          color: language === "hi" ? "var(--color-ink)" : "var(--color-mute)",
          boxShadow: language === "hi" ? "var(--shadow-whisper)" : "none",
          transition: "all 0.15s ease",
          cursor: "pointer",
        }}
      >
        हिन्दी
      </button>
    </div>
  );
}
