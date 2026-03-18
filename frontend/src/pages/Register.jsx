import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/student/register", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="auth-layout">
      <div className="form-hero">
        <span className="section-tag">Student registration</span>
        <h1>Start building your placement workflow.</h1>
        <p>
          Create your student account to manage preparation, keep your profile ready, and prepare with better consistency.
        </p>
        <div className="form-hero-points">
          <span>Centralize quiz and company prep</span>
          <span>Keep your profile application-ready</span>
          <span>Resume and interview tools included</span>
        </div>
      </div>

      <form className="form-shell auth-form-shell" onSubmit={handleSubmit}>
        <div className="form-shell-head">
          <span className="section-tag">Student portal</span>
          <h2>Create account</h2>
          <p>Set up your student profile and begin preparing in one workspace.</p>
        </div>

        {message && <p className="message-banner message-banner-error">{message}</p>}

        <label className="field">
          <span>Full name</span>
          <input
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </label>

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
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>

        <div className="form-actions">
          <button className="primary form-submit-button" type="submit">Create Account</button>
        </div>

        <div className="form-meta-links">
          <Link to="/login/student">Already have a student account?</Link>
          <Link to="/login/admin">Admin login</Link>
        </div>
      </form>
    </section>
  );
}
