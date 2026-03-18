import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    students: 0,
    companies: 0,
    quizzes: 0,
    questions: 0
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const [usersRes, companiesRes, quizzesRes, questionsRes] = await Promise.all([
          api.get("/users"),
          api.get("/companies"),
          api.get("/quizzes"),
          api.get("/questions")
        ]);

        setSummary({
          students: usersRes.data.filter((user) => user.role === "student").length,
          companies: companiesRes.data.length,
          quizzes: quizzesRes.data.length,
          questions: questionsRes.data.length
        });
      } catch (error) {
        setMessage("Failed to load admin summary");
      }
    };

    loadSummary();
  }, []);

  const quickLinks = [
    {
      title: "Manage Content",
      description: "Create and update companies, quiz questions, and quiz sets.",
      to: "/admin/manage"
    },
    {
      title: "Student Control",
      description: "Review student records and update placement status.",
      to: "/admin/users"
    },
    {
      title: "Analytics",
      description: "Track totals and placement pipeline health from one screen.",
      to: "/admin/analytics"
    }
  ];

  return (
    <section className="page-stack">
      <div className="form-page-head">
        <span className="section-tag">Admin workspace</span>
        <h1>Control the placement portal from one admin dashboard.</h1>
        <p>Manage platform content, monitor student progress, and keep placement data current.</p>
      </div>

      {message && <div className="card"><p>{message}</p></div>}

      <div className="grid">
        <div className="stat"><h3>Students</h3><p>{summary.students}</p></div>
        <div className="stat"><h3>Companies</h3><p>{summary.companies}</p></div>
        <div className="stat"><h3>Quizzes</h3><p>{summary.quizzes}</p></div>
        <div className="stat"><h3>Questions</h3><p>{summary.questions}</p></div>
      </div>

      <div className="feature-grid">
        {quickLinks.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link className="hero-button hero-button-primary" to={item.to}>
              Open
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
