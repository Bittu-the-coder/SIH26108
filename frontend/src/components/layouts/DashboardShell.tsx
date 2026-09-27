"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../atoms/Logo";
import { LanguageToggle } from "../molecules/LanguageToggle";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Layers,
  History,
  BarChart3,
  Terminal,
  Settings,
  Menu,
  X,
  Search,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bell,
  ArrowRight
} from "lucide-react";

import { useAppStore } from "@/lib/store";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAppStore();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // If user is not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, pathname, router]);

  // If user is not authenticated, require officer login to access portal
  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--color-canvas)",
          padding: "var(--space-xl)",
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: "460px",
            textAlign: "center",
            padding: "var(--space-2xl)",
            boxShadow: "var(--shadow-floating)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "var(--color-hairline-soft)",
              border: "1px solid var(--color-hairline)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "var(--space-md)",
              color: "var(--color-link)",
            }}
          >
            <ShieldCheck size={24} />
          </div>
          <h2 className="heading-md" style={{ marginBottom: "8px", color: "var(--color-ink)" }}>
            Officer Sign In Required
          </h2>
          <p className="body-md" style={{ marginBottom: "var(--space-xl)", color: "var(--color-body)" }}>
            Access to the Bureau of Indian Standards Intelligence Portal & Spec Analyzer requires authenticated government or organization credentials.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/login"
              className="btn-primary"
              style={{ width: "100%", height: "42px", justifyContent: "center" }}
            >
              <span>Sign In to Access Portal</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/"
              className="btn-ghost-sm"
              style={{ width: "100%", height: "38px", justifyContent: "center" }}
            >
              <span>Return to Public Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      group: "CORE ENGINE",
      items: [
        { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
        { href: "/recommend", label: "Spec Analyzer", icon: Sparkles, badge: "AI" },
        { href: "/standards", label: "Standards Catalog", icon: BookOpen },
        { href: "/categories", label: "Division Councils", icon: Layers },
      ],
    },
    {
      group: "INTELLIGENCE & AUDIT",
      items: [
        { href: "/history", label: "Audit History", icon: History },
        { href: "/admin/eval", label: "Model Benchmark", icon: BarChart3 },
        { href: "/docs", label: "API & Reference", icon: Terminal },
      ],
    },
    {
      group: "PREFERENCES",
      items: [
        { href: "/settings", label: "Settings & API Keys", icon: Settings },
      ],
    },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/standards?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  // Extract page title from pathname
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Portal Overview";
    if (pathname === "/recommend") return "Specification Recommendation Engine";
    if (pathname.startsWith("/standards/")) return "Standard Technical Specification";
    if (pathname === "/standards") return "Indian Standards Catalog";
    if (pathname === "/categories") return "Division Councils & Categories";
    if (pathname === "/history") return "Procurement Query Audit Trail";
    if (pathname === "/admin/eval") return "Model Evaluation & Benchmark";
    if (pathname === "/docs") return "API & Integration Reference";
    if (pathname === "/settings") return "Account & API Settings";
    return "BIS Portal";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-canvas)" }}>
      {/* =========================================================================
          DESKTOP SIDEBAR (260px fixed width, hairline border right)
          ========================================================================= */}
      <aside
        style={{
          width: "260px",
          flexShrink: 0,
          borderRight: "1px solid var(--color-hairline)",
          backgroundColor: "var(--color-canvas-elevated)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 40,
        }}
        className="dashboard-sidebar-desktop"
      >
        {/* Brand Logo Header */}
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            padding: "0 var(--space-lg)",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center" }}>
            <Logo size={28} />
          </Link>
        </div>

        {/* Navigation Groups */}
        <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-md) var(--space-sm)" }}>
          {navItems.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: "var(--space-md)" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "var(--color-mute)",
                  letterSpacing: "0.08em",
                  padding: "0 12px 6px",
                }}
              >
                {group.group}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 12px",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "13px",
                        fontWeight: isActive ? 600 : 500,
                        backgroundColor: isActive ? "var(--color-hairline-soft)" : "transparent",
                        color: isActive ? "var(--color-ink)" : "var(--color-body)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Icon size={16} style={{ color: isActive ? "var(--color-ink)" : "var(--color-mute)" }} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: "10px",
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            backgroundColor: "var(--color-link-soft)",
                            color: "var(--color-link-deep)",
                            padding: "1px 6px",
                            borderRadius: "var(--radius-pill)",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile Footer */}
        <div
          style={{
            padding: "var(--space-md)",
            borderTop: "1px solid var(--color-hairline)",
            backgroundColor: "var(--color-canvas)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-on-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  fontSize: "12px",
                }}
              >
                {user?.name ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("") : "RK"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-ink)" }}>
                  {user?.name || "Er. Rajesh Kumar"}
                </span>
                <span className="body-sm" style={{ fontSize: "10px" }}>
                  {user?.department || "CPWD Northern"}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign out of portal"
              style={{ color: "var(--color-mute)", padding: "4px", cursor: "pointer" }}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE SIDEBAR OVERLAY DRAWER
          ========================================================================= */}
      {mobileSidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer content */}
          <div
            style={{
              position: "relative",
              width: "280px",
              backgroundColor: "var(--color-canvas-elevated)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              zIndex: 101,
              boxShadow: "var(--shadow-floating)",
            }}
          >
            <div
              style={{
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 var(--space-lg)",
                borderBottom: "1px solid var(--color-hairline)",
              }}
            >
              <Logo size={28} />
              <button onClick={() => setMobileSidebarOpen(false)} className="btn-icon-circular">
                <X size={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "var(--space-md) var(--space-sm)" }}>
              {navItems.map((group, gIdx) => (
                <div key={gIdx} style={{ marginBottom: "var(--space-md)" }}>
                  <div className="mono-eyebrow" style={{ padding: "0 12px 6px", fontSize: "10px" }}>
                    {group.group}
                  </div>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 12px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "14px",
                          fontWeight: isActive ? 600 : 500,
                          backgroundColor: isActive ? "var(--color-hairline-soft)" : "transparent",
                          color: isActive ? "var(--color-ink)" : "var(--color-body)",
                        }}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            <div style={{ padding: "var(--space-md)", borderTop: "1px solid var(--color-hairline)" }}>
              <Link
                href="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="btn-ghost-sm"
                style={{ width: "100%", height: "38px" }}
              >
                <LogOut size={14} style={{ marginRight: "6px" }} />
                <span>Return to Landing Page</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MAIN APPLICATION AREA (Top App Bar + Content)
          ========================================================================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top App Header Bar */}
        <header
          style={{
            height: "64px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 clamp(16px, 3vw, 28px)",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          {/* Left: Mobile trigger & Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="btn-icon-circular dashboard-mobile-trigger"
              style={{ display: "none" }}
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
              <Link href="/dashboard" style={{ color: "var(--color-mute)", fontWeight: 500 }}>
                Portal
              </Link>
              <ChevronRight size={13} style={{ color: "var(--color-faint)" }} />
              <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Right: Quick Search, System Pulse, Language Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Quick Search */}
            <form onSubmit={handleSearchSubmit} className="dashboard-header-search" style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-mute)",
                }}
              />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search standard (e.g. IS 456)..."
                className="text-input"
                style={{
                  height: "34px",
                  paddingLeft: "32px",
                  fontSize: "12px",
                  width: "220px",
                }}
              />
            </form>

            {/* Live Engine Status Pulse Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "3px 9px",
                backgroundColor: "var(--color-hairline-soft)",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--color-hairline)",
                fontSize: "11px",
                fontWeight: 600,
                color: "var(--color-body)",
              }}
              className="dashboard-header-status"
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#0b8a36",
                  display: "inline-block",
                  boxShadow: "0 0 0 2px rgba(11, 138, 54, 0.2)",
                }}
              />
              <span>RRF Active</span>
            </div>

            <LanguageToggle />

            <Link
              href="/settings"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--color-hairline-soft)",
                border: "1px solid var(--color-hairline)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-ink)",
              }}
              title="Settings"
            >
              <Settings size={15} />
            </Link>
          </div>
        </header>

        {/* Main Dashboard Child Content */}
        <main style={{ flex: 1, padding: "clamp(16px, 3vw, 32px)" }}>
          {children}
        </main>
      </div>

      {/* Responsive CSS for Dashboard Shell */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .dashboard-sidebar-desktop {
            display: none !important;
          }
          .dashboard-mobile-trigger {
            display: inline-flex !important;
          }
          .dashboard-header-search {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .dashboard-header-status {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
