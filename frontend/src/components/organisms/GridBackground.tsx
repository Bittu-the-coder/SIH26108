import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className = "" }: GridBackgroundProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`.trim()}
      style={{ position: "relative" }}
    >
      {/* 21st.dev Style Precision Grid Pattern with Radial Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 65% 65% at 50% 30%, #000 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 30%, #000 65%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* High-tech Subtle Monochromatic Light Accent */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "720px",
          height: "360px",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(0, 112, 243, 0.08) 0%, transparent 100%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
