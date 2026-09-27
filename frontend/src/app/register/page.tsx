"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/atoms/Logo";
import { ArrowRight, Building, Mail, User, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "Executive Engineer",
    org: "Central Public Works Department (CPWD)",
    email: "officer@cpwd.gov.in",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/recommend");
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
          maxWidth: "460px",
          padding: "var(--space-2xl)",
          boxShadow: "var(--shadow-floating)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          <div style={{ display: "inline-block", marginBottom: "var(--space-md)" }}>
            <Logo size={36} showText={false} />
          </div>
          <h1 className="heading-md" style={{ color: "var(--color-ink)", marginBottom: "4px" }}>
            Register Organization Account
          </h1>
          <p className="body-sm">
            Empower your department with automated BIS compliance verification.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <div>
            <label
              htmlFor="name"
              style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-ink)" }}
            >
              Full Name & Designation
            </label>
            <div style={{ position: "relative" }}>
              <User size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-mute)" }} />
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="text-input"
                style={{ paddingLeft: "36px" }}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="org"
              style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-ink)" }}
            >
              Department / PSU / Organization
            </label>
            <div style={{ position: "relative" }}>
              <Building size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-mute)" }} />
              <input
                id="org"
                type="text"
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                className="text-input"
                style={{ paddingLeft: "36px" }}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              style={{ display: "block", fontSize: "13px", fontWeight: 600, marginBottom: "6px", color: "var(--color-ink)" }}
            >
              Official Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-mute)" }} />
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="text-input"
                style={{ paddingLeft: "36px" }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", height: "42px", marginTop: "8px" }}>
            <span>Create Departmental Account</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div style={{ marginTop: "var(--space-xl)", paddingTop: "var(--space-md)", borderTop: "1px solid var(--color-hairline)", textAlign: "center" }}>
          <p className="body-sm">
            Already have an account?{" "}
            <Link href="/login" style={{ color: "var(--color-link)", fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
