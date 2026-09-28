import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green" | "warning";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantClass = variant === "default" ? "" : `badge-${variant}`;
  return (
    <span className={`badge ${variantClass} ${className}`.trim()}>
      {children}
    </span>
  );
}
