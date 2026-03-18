import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Login({ role = "student" }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/auth/${role}/login`, form);
      login(data);
      navigate(isAdmin ? "/admin/dashboard" : "/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="auth-layout">
      <div className="form-hero">
        <span className="section-tag">{isAdmin ? "Admin access" : "Student access"}</span>
        <h1>{isAdmin ? "Sign in to manage the placement portal." : "Return to your placement workspace."}</h1>
        <p>
          {isAdmin
            ? "Manage companies, quiz questions, quizzes, interviews, and student progress from the admin workspace."
            : "Continue your quiz practice, resume updates, company tracking, and interview preparation from one place."}
        </p>
        <div className="form-hero-points">
          {isAdmin ? (
            <>
              <span>Control quiz, question, and company data</span>
              <span>Manage student placement progress</span>
              <span>Schedule and update interview flow</span>
            </>
          ) : (
            <>
              <span>Track preparation in one dashboard</span>
              <span>Resume and profile tools ready</span>
              <span>Practice before upcoming drives</span>
            </>
          )}
        </div>
      </div>

      <form className="form-shell auth-form-shell" onSubmit={handleSubmit}>
        <div className="form-shell-head">
          <span className="section-tag">{isAdmin ? "Admin login" : "Student login"}</span>
          <h2>Sign in</h2>
          <p>{isAdmin ? "Use an admin account to enter the control panel." : "Use your student account to continue preparing."}</p>
        </div>

        {message && <p className="message-banner message-banner-error">{message}</p>}

        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>

        <div className="form-actions">
          <button className="primary form-submit-button" type="submit">Login</button>
        </div>

        <div className="form-meta-links">
          <Link to="/forgot-password">Forgot password?</Link>
          {isAdmin ? <Link to="/login/student">Student login</Link> : <Link to="/register">Create an account</Link>}
          {!isAdmin && <Link to="/login/admin">Admin login</Link>}
        </div>
      </form>
    </section>
  );
}
