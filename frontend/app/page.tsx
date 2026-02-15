"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

function FeatureCard({
  title,
  body,
  tag,
}: {
  title: string;
  body: string;
  tag: string;
}) {
  return (
    <div className="card cardHover">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="badge">{tag}</span>
        <span className="dot" aria-hidden />
      </div>
      <div style={{ height: 10 }} />
      <h3 className="h3">{title}</h3>
      <p className="p">{body}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="grid" style={{ gap: 18 }}>
      {/* HERO */}
      <div className="card hero">
        <div className="heroGlow" aria-hidden />
        <div className="heroInner">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="badge">FreshList • Healthy Eating</span>
            <span className="badge">Next.js • AWS • DynamoDB</span>
          </div>

          <div style={{ height: 14 }} />
          <h1 className="h1">
            Healthy eating,{" "}
            <span className="accentText">simplified</span>.
          </h1>
          <p className="p" style={{ maxWidth: 720 }}>
            Generate a weekly meal plan and an organized grocery list based on
            your goals and preferences. Clean UI, mock auth, and a serverless
            backend—built as a recruiter-friendly portfolio demo.
          </p>

          <div style={{ height: 18 }} />
          <div className="row">
            <Link className="btn btnPrimary" href="/login">
              Try Demo
              <span className="btnArrow" aria-hidden>→</span>
            </Link>
            <Link className="btn btnSecondary" href="/recruiter">
              Recruiter View
            </Link>
            <Link className="btn btnGhost" href="/dashboard">
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
          </div>

          <div style={{ height: 18 }} />
          <div className="row" style={{ gap: 10 }}>
            <span className="pill">Mock Auth (localStorage)</span>
            <span className="pill">API Gateway + Lambda</span>
            <span className="pill">DynamoDB Single Table</span>
            <span className="pill">GitHub Actions CI/CD</span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-3">
        <FeatureCard
          tag="Meal Plans"
          title="Plan your week"
          body="Generate 7 days of meals with calories and protein estimates. Built to be fast, deterministic, and demo-friendly."
        />
        <FeatureCard
          tag="Swaps"
          title="Swap without chaos"
          body="Swap one meal while keeping macros in the same neighborhood—simple logic now, extensible later."
        />
        <FeatureCard
          tag="Grocery"
          title="Shop with structure"
          body="Turn the plan into a categorized grocery list. Clear quantities and clean grouping for quick shopping."
        />
      </div>

      {/* SECONDARY SECTION */}
      <div className="grid grid-2">
        <div className="card">
          <h2 className="h2">Built like a real system</h2>
          <p className="p">
            The UI calls a serverless API. Deploys are automated: GitHub Actions
            builds and ships backend infrastructure (Terraform) and deploys the
            frontend to Vercel.
          </p>
          <div className="hr" />
          <div className="row" style={{ gap: 10 }}>
            <span className="badge">Frontend</span>
            <span className="small">Next.js 14, TypeScript</span>
          </div>
          <div className="row" style={{ gap: 10, marginTop: 8 }}>
            <span className="badge">Backend</span>
            <span className="small">Lambda (Node 20), HTTP API</span>
          </div>
          <div className="row" style={{ gap: 10, marginTop: 8 }}>
            <span className="badge">Data</span>
            <span className="small">DynamoDB single-table (+ GSI)</span>
          </div>
        </div>

        <div className="card">
          <h2 className="h2">Next improvements</h2>
          <ul className="list">
            <li>More meal variety with anti-repeat rules</li>
            <li>Better macro targeting by user profile</li>
            <li>Shopping list pantry tracking</li>
            <li>Simple charts for weekly adherence</li>
          </ul>
          <div className="hr" />
          <p className="p">
            Keep it simple and recruiter-readable—then layer in enhancements.
          </p>
        </div>
      </div>
    </div>
  );
}