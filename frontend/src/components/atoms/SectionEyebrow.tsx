import React from "react";

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <div className={`mono-eyebrow ${className}`.trim()} style={{ marginBottom: "8px" }}>
      {children}
    </div>
  );
}
