import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "primary-sm" | "ghost-sm" | "category-pill" | "icon";
  href?: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary-sm",
  href,
  isActive = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  let styleClass = "btn-primary-sm";

  switch (variant) {
    case "primary":
      styleClass = "btn-primary";
      break;
    case "secondary":
      styleClass = "btn-secondary";
      break;
    case "primary-sm":
      styleClass = "btn-primary-sm";
      break;
    case "ghost-sm":
      styleClass = "btn-ghost-sm";
      break;
    case "category-pill":
      styleClass = `btn-category-pill ${isActive ? "active" : ""}`;
      break;
    case "icon":
      styleClass = "btn-icon-circular";
      break;
  }

  const combinedClass = `${styleClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
}
