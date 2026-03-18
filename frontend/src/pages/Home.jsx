import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const featureCards = [
  {
    title: "Focused Quiz Practice",
    description: "Work through aptitude, reasoning, and technical questions in a format that feels close to placement rounds.",
  },
  {
    title: "Company Research Hub",
    description: "Track company opportunities, study patterns, and stay organized before each application window opens.",
  },
  {
    title: "Resume Builder",
    description: "Create a cleaner resume draft quickly so you spend more time improving content and less time formatting.",
  },
  {
    title: "Mock Interview Flow",
    description: "Prepare for HR and technical rounds with guided practice that keeps your answers structured and concise.",
  },
];

const prepSteps = [
  {
    step: "01",
    title: "Build your base",
    description: "Start with quizzes to identify weak topics before interview season gets busy.",
  },
  {
    step: "02",
    title: "Sharpen your profile",
    description: "Use the resume tools and profile section to keep your application material ready.",
  },
  {
    step: "03",
    title: "Simulate the real rounds",
    description: "Practice mock interviews and review company-specific preparation before you apply.",
  },
];

const spotlightItems = [
  "Single place for quizzes, resumes, mock interviews, and company tracking",
  "Designed for placement season instead of generic learning workflows",
  "Simple route from practice to application readiness",
];

export default function Home() {
  const { userInfo } = useAuth();
  const primaryTarget = userInfo?.role === "admin" ? "/admin/dashboard" : userInfo ? "/dashboard" : "/register";
  const primaryLabel = userInfo?.role === "admin" ? "Open Admin Dashboard" : userInfo ? "Open Dashboard" : "Start Preparing";
  const secondaryTarget = userInfo ? (userInfo.role === "admin" ? "/admin/manage" : "/companies") : "/login/student";
  const secondaryLabel = userInfo ? (userInfo.role === "admin" ? "Open Admin Tools" : "View Companies") : "Student Login";

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="hero-kicker">Placement preparation portal</span>
          <h1>Train for campus hiring with a dashboard built around actual placement workflows.</h1>
          <p className="hero-lead">
            Move from scattered prep to a cleaner system for practice, profile building, company tracking, and interview readiness.
          </p>

          <div className="hero-actions">
            <Link className="hero-button hero-button-primary" to={primaryTarget}>
              {primaryLabel}
            </Link>
            <Link className="hero-button hero-button-secondary" to="/quiz">
              Explore Quiz Practice
            </Link>
          </div>

          {!userInfo && (
            <div className="form-meta-links">
              <Link to="/login/student">Student login</Link>
              <Link to="/login/admin">Admin login</Link>
            </div>
          )}

          <div className="hero-strip">
            <div className="hero-strip-card">
              <strong>Practice</strong>
              <span>Quiz rounds for consistent preparation</span>
            </div>
            <div className="hero-strip-card">
              <strong>Present</strong>
              <span>Resume and profile tools for applications</span>
            </div>
            <div className="hero-strip-card">
              <strong>Perform</strong>
              <span>Mock interview flow before the real round</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-header">
            <span className="panel-label">Prep blueprint</span>
            <h2>What this portal is meant to solve</h2>
          </div>

          <div className="hero-panel-metrics">
            <div>
              <strong>3-stage plan</strong>
              <span>Practice, polish, and perform</span>
            </div>
            <div>
              <strong>1 workspace</strong>
              <span>Less switching between tools</span>
            </div>
          </div>

          <ul className="hero-checklist">
            {spotlightItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero-panel-footer">
            <span className="panel-note">Best used consistently through the semester, not only one week before drives begin.</span>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <span className="section-tag">Core modules</span>
          <h2>Everything important for placements, grouped into one flow</h2>
        </div>

        <div className="feature-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="feature-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section prep-roadmap">
        <div className="section-heading">
          <span className="section-tag">Roadmap</span>
          <h2>A simple sequence that keeps preparation organized</h2>
        </div>

        <div className="roadmap-grid">
          {prepSteps.map((item) => (
            <article key={item.step} className="roadmap-card">
              <span className="roadmap-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="section-tag">Next move</span>
          <h2>Stop preparing in fragments.</h2>
          <p>Use the portal as your main workspace for placement season and keep every step visible.</p>
        </div>
        <Link className="hero-button hero-button-primary" to={secondaryTarget}>
          {secondaryLabel}
        </Link>
      </section>
    </div>
  );
}
