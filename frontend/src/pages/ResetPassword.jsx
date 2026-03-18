import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ token: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setForm((prev) => ({ ...prev, token }));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/reset-password", form);
      setMessage(data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed");
      setMessageType("error");
    }
  };

  return (
    <section className="auth-layout auth-layout-compact">
      <div className="form-hero">
        <span className="section-tag">Password reset</span>
        <h1>Set a fresh password and continue your preparation.</h1>
        <p>Use the reset token from your email and create a password you can remember securely.</p>
      </div>

      <form className="form-shell auth-form-shell" onSubmit={handleSubmit}>
        <div className="form-shell-head">
          <span className="section-tag">Reset access</span>
          <h2>Reset password</h2>
          <p>Enter the reset token and set your new password.</p>
        </div>

        {message && <p className={`message-banner ${messageType === "error" ? "message-banner-error" : "message-banner-success"}`}>{message}</p>}

        <label className="field">
          <span>Reset token</span>
          <input
            placeholder="Paste the token"
            value={form.token}
            onChange={(e) => setForm({ ...form, token: e.target.value })}
          />
        </label>

        <label className="field">
          <span>New password</span>
          <input
            type="password"
            placeholder="Create a new password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>

        <div className="form-actions">
          <button className="primary form-submit-button" type="submit">Reset Password</button>
        </div>
      </form>
    </section>
  );
}
