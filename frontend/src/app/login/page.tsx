"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";
import { useAppStore } from "@/lib/store";
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppStore();
  const [email, setEmail] = useState("officer.cpwd@nic.in");
  const [password, setPassword] = useState("••••••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, name: "Er. Rajesh Kumar", department: "Central Public Works Department (CPWD)" });
    router.push("/dashboard");
  };

  const handleDemoLogin = () => {
    login({
      name: "Er. Rajesh Kumar",
      email: "officer.cpwd@nic.in",
      department: "Central Public Works Department (CPWD)",
      designation: "Superintending Engineer",
    });
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 160px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-2xl) var(--space-md)",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "var(--space-2xl)",
          boxShadow: "var(--shadow-floating)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          <div style={{ display: "inline-block", marginBottom: "var(--space-md)" }}>
            <Logo size={36} showText={false} />
          </div>
          <h1 className="heading-md" style={{ color: "var(--color-ink)", marginBottom: "4px" }}>
            Officer Sign In
          </h1>
          <p className="body-sm">
            Government procurement officer & departmental portal access.
          </p>
        </div>

        {/* 1-Click Demo Quick Access */}
        <div
          style={{
            padding: "14px 16px",
            backgroundColor: "var(--color-canvas)",
            border: "1px solid var(--color-hairline)",
            borderRadius: "var(--radius-md)",
            marginBottom: "var(--space-md)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#0b8a36" }} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-ink)" }}>
                Evaluation & Demo Mode
              </span>
            </div>
            <span className="badge badge-blue" style={{ fontSize: "10px" }}>
              Pre-configured
            </span>
          </div>

          <div className="body-sm" style={{ fontSize: "12px", color: "var(--color-body)", lineHeight: "16px" }}>
            Pre-loaded profile: <strong style={{ color: "var(--color-ink)" }}>Er. Rajesh Kumar</strong> (CPWD Northern Division)
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="btn-primary"
            style={{
              width: "100%",
              height: "40px",
              fontSize: "13px",
              fontWeight: 600,
              justifyContent: "center",
              gap: "8px",
              whiteSpace: "nowrap",
            }}
          >
            <Sparkles size={14} />
            <span>1-Click Demo Officer Sign In</span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "var(--space-md) 0" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-hairline)" }} />
          <span className="body-sm" style={{ fontSize: "11px", color: "var(--color-mute)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Or sign in with email
          </span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "var(--color-hairline)" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-ink)" }}
            >
              Government / Official Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-mute)" }} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-input"
                style={{ paddingLeft: "36px" }}
                required
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label
                htmlFor="password"
                style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-ink)" }}
              >
                Password
              </label>
              <a href="#" className="body-sm" style={{ color: "var(--color-link)", fontSize: "12px" }}>
                Forgot?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-mute)" }} />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-input"
                style={{ paddingLeft: "36px" }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", height: "42px", marginTop: "8px", justifyContent: "center" }}>
            <span>Sign In to Portal</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div style={{ marginTop: "var(--space-xl)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--color-hairline)", textAlign: "center" }}>
          <p className="body-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--color-link)", fontWeight: 500 }}>
              Register organization
            </Link>
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "var(--space-md)" }}>
          <ShieldCheck size={14} style={{ color: "var(--color-success)" }} />
          <span className="body-sm" style={{ fontSize: "11px" }}>NIC SSO & Jan Parichay Ready</span>
        </div>
      </div>
    </div>
  );
}
