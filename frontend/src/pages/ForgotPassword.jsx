import React, { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/auth/forgot-password", { email });
    setResponse(data);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="primary" type="submit">Generate Reset Token</button>
      {response && (
        <div>
          <p>{response.message}</p>
          {response.resetToken && <p>Demo reset token: {response.resetToken}</p>}
          {response.resetLink && <p>Reset link: <a href={response.resetLink}>{response.resetLink}</a></p>}
        </div>
      )}
    </form>
  );
}
