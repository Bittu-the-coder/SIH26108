import React from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 28, showText = true, className = "" }: LogoProps) {
  return (
    <div
      className={`logo-container ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        userSelect: "none",
      }}
    >
      {/* Precision Geometric Standards Emblem */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Outer Hexagonal Shield / Standards Gauge */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="9"
          fill="#171717"
          stroke="#262626"
          strokeWidth="1.5"
        />

        {/* Dynamic BIS Precision Geometry */}
        {/* Outer precision grid lines */}
        <circle cx="20" cy="20" r="13" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />

        {/* The 'IS' Interlocking Monogram + Verification Check */}
        {/* Diamond frame */}
        <path
          d="M20 9L29 20L20 31L11 20L20 9Z"
          stroke="#0070f3"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Central Core AI Dot */}
        <circle cx="20" cy="20" r="3.5" fill="#ffffff" />
        <circle cx="20" cy="20" r="1.5" fill="#171717" />

        {/* Corner alignment crosshairs */}
        <line x1="20" y1="5" x2="20" y2="8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="32" x2="20" y2="35" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="20" x2="8" y2="20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="20" x2="35" y2="20" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "-0.4px",
                color: "var(--color-ink)",
              }}
            >
              BIS Intelligence
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                fontWeight: 600,
                backgroundColor: "var(--color-hairline-soft)",
                color: "var(--color-mute)",
                padding: "1px 5px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-hairline)",
              }}
            >
              AI
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              color: "var(--color-mute)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Indian Standards Engine
          </span>
        </div>
      )}
    </div>
  );
}
