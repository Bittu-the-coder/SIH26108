"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../atoms/Logo";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "../atoms/Button";
import { ArrowRight, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAppStore();

  const navLinks = [
    { href: "/#capabilities", label: "Capabilities" },
    { href: "/#architecture", label: "Architecture" },
    { href: "/#integration", label: "Procurement" },
    { href: "/docs", label: "API Reference" },
    { href: "/about", label: "About SIH26108" },
  ];

  return (
    <>
      <header className="nav-bar">
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo Component */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo size={32} />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Elements: Language, Log In/User, Get Started/Dashboard */}
          <div className="desktop-nav-links" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <LanguageToggle />

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "34px",
                    padding: "0 10px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--color-hairline-soft)",
                    border: "1px solid var(--color-hairline)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-ink)",
                      color: "var(--color-canvas)",
                      fontSize: "10px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user?.name ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("") : "RK"}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-ink)" }}>
                    {user?.name || "Officer"}
                  </span>
                </Link>

                <Link
                  href="/dashboard"
                  className="btn-primary-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    height: "34px",
                    padding: "0 12px",
                    fontWeight: 500,
                    fontSize: "13px",
                  }}
                >
                  <LayoutDashboard size={13} />
                  <span>Portal</span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="btn-icon-circular"
                  style={{ width: "34px", height: "34px" }}
                >
                  <LogOut size={14} style={{ color: "var(--color-mute)" }} />
                </button>
              </>
            ) : (
              <>
                {/* Official Log In CTA */}
                <Link
                  href="/login"
                  className="btn-ghost-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    height: "34px",
                    padding: "0 12px",
                    fontWeight: 500,
                    fontSize: "13px",
                  }}
                >
                  <User size={14} style={{ color: "var(--color-mute)" }} />
                  <span>Log In</span>
                </Link>

                {/* Primary Get Started -> goes to Login for unauthenticated users */}
                <Link
                  href="/login"
                  className="btn-primary-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    height: "34px",
                    padding: "0 14px",
                    fontWeight: 500,
                    fontSize: "13px",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={13} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-trigger" style={{ display: "none", alignItems: "center", gap: "8px" }}>
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon-circular"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-drawer"
          style={{
            display: "flex",
            position: "sticky",
            top: "64px",
            zIndex: 49,
            animation: "fadeIn 0.15s ease",
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link ${isActive ? "active" : ""}`}
                style={{ width: "100%", padding: "10px 14px", fontSize: "15px" }}
              >
                {link.label}
              </Link>
            );
          })}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px", paddingTop: "8px", borderTop: "1px solid var(--color-hairline)" }}>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary-sm"
                  style={{ flex: 1, height: "40px", justifyContent: "center" }}
                >
                  Enter Portal →
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-ghost-sm"
                  style={{ flex: 1, height: "40px", justifyContent: "center" }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-ghost-sm"
                  style={{ flex: 1, height: "40px", justifyContent: "center" }}
                >
                  Log In
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary-sm"
                  style={{ flex: 1, height: "40px", justifyContent: "center" }}
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
