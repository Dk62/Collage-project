import React, { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Profile() {
  const { updateUserInfo } = useAuth();
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", college: "", skills: "", resumeUrl: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const { data } = await api.get("/users/profile");
      setProfile(data);
      setForm({
        name: data.name || "",
        college: data.college || "",
        skills: (data.skills || []).join(", "),
        resumeUrl: data.resumeUrl || ""
      });
      updateUserInfo({ name: data.name, role: data.role, email: data.email });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProfile(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put("/users/profile", {
      name: form.name,
      college: form.college,
      skills: form.skills.split(",").map((x) => x.trim()).filter(Boolean),
      resumeUrl: form.resumeUrl
    });
    setMessage("Profile updated successfully");
    loadProfile();
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="page-stack">
      <div className="form-page-head">
        <span className="section-tag">Profile</span>
        <h1>Keep your student profile interview-ready.</h1>
        <p>Update the details recruiters and your own preparation workflow depend on.</p>
      </div>

      <div className="profile-layout">
        <form className="form-shell" onSubmit={handleSubmit}>
          <div className="form-shell-head">
            <h2>Student profile</h2>
            <p>Maintain the latest version of your personal and placement details.</p>
          </div>

          {message && <p className="message-banner message-banner-success">{message}</p>}

          <div className="form-grid-two">
            <label className="field">
              <span>Full name</span>
              <input value={form.name} placeholder="Enter your name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>

            <label className="field">
              <span>College</span>
              <input value={form.college} placeholder="Enter your college" onChange={(e) => setForm({ ...form, college: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Skills</span>
              <input
                value={form.skills}
                placeholder="Example: DSA, React, Node.js, Aptitude"
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </label>

            <label className="field">
              <span>Placement status</span>
              <input value={profile?.placementStatus || "preparing"} disabled readOnly />
            </label>

            <label className="field">
              <span>Resume URL</span>
              <input
                value={form.resumeUrl}
                placeholder="Paste resume link if available"
                onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              />
            </label>
          </div>

          <div className="form-actions">
            <button className="primary form-submit-button" type="submit">Save Profile</button>
          </div>
        </form>

        <aside className="info-panel">
          <div className="info-panel-card">
            <span className="section-tag">Current snapshot</span>
            <h3>Preparation overview</h3>
            <p>Use this panel to keep an eye on the profile details that support placement applications.</p>
          </div>

          <div className="info-panel-card">
            <h3>Applied companies</h3>
            <div className="list-stack">
              {profile?.appliedCompanies?.length ? profile.appliedCompanies.map((company) => (
                <div key={company._id} className="list-item-row">
                  <strong>{company.name}</strong>
                  <span>{company.role}</span>
                </div>
              )) : <p>No applications yet.</p>}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
