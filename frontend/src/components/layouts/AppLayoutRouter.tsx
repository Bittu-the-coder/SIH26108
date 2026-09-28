"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "../molecules/Navbar";
import { Footer } from "../molecules/Footer";
import { DashboardShell } from "./DashboardShell";

interface AppLayoutRouterProps {
  children: React.ReactNode;
}

export function AppLayoutRouter({ children }: AppLayoutRouterProps) {
  const pathname = usePathname();

  // Public marketing & auth pages get the public navbar + footer
  const isMarketingPage =
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/login" ||
    pathname === "/register";

  if (isMarketingPage) {
    return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    );
  }

  // All authenticated portal/app routes get the sleek sidebar dashboard
  return <DashboardShell>{children}</DashboardShell>;
}
