import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ResumeBuilder() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    careerObjective: "",
    skills: "",
    education: "",
    projects: "",
    certifications: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/users/profile").then((res) => {
      if (res.data.resumeData) setForm(res.data.resumeData);
    }).catch(console.error);
  }, []);

  const handleSave = async () => {
    await api.put("/users/profile", { resumeData: form });
    setMessage("Resume data saved");
  };

  const handlePrint = () => window.print();

  return (
    <section className="page-stack">
      <div className="form-page-head">
        <span className="section-tag">Resume builder</span>
        <h1>Draft a cleaner resume and preview it live.</h1>
        <p>Write, save, and print your resume from one screen without breaking your workflow.</p>
      </div>

      <div className="resume-builder-layout">
        <form className="form-shell" onSubmit={(e) => e.preventDefault()}>
          <div className="form-shell-head">
            <h2>Resume details</h2>
            <p>Keep the content concise and placement-focused.</p>
          </div>

          {message && <p className="message-banner message-banner-success">{message}</p>}

          <div className="form-grid-two">
            <label className="field">
              <span>Full name</span>
              <input placeholder="Enter your full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            </label>

            <label className="field">
              <span>Email</span>
              <input placeholder="Enter your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Phone</span>
              <input placeholder="Enter your phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Career objective</span>
              <textarea placeholder="Write a short placement-focused objective" value={form.careerObjective} onChange={(e) => setForm({ ...form, careerObjective: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Skills</span>
              <textarea placeholder="List skills separated by commas" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Education</span>
              <textarea placeholder="Add degree, college, year, and academic highlights" value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Projects</span>
              <textarea placeholder="Describe your key projects with outcomes or tools used" value={form.projects} onChange={(e) => setForm({ ...form, projects: e.target.value })} />
            </label>

            <label className="field field-span-2">
              <span>Certifications</span>
              <textarea placeholder="Add certificates, courses, or workshops" value={form.certifications} onChange={(e) => setForm({ ...form, certifications: e.target.value })} />
            </label>
          </div>

          <div className="form-actions">
            <button className="primary form-submit-button" type="button" onClick={handleSave}>Save Resume</button>
            <button className="secondary-button" type="button" onClick={handlePrint}>Export / Print PDF</button>
          </div>
        </form>

        <div className="resume-preview card">
          <span className="section-tag">Live preview</span>
          <h1>{form.fullName || "Your Name"}</h1>
          <p className="resume-contact">{form.email || "your@email.com"} {form.phone ? `| ${form.phone}` : ""}</p>
          <h3>Career Objective</h3>
          <p>{form.careerObjective || "Your career objective will appear here."}</p>
          <h3>Skills</h3>
          <p>{form.skills || "Your key skills will appear here."}</p>
          <h3>Education</h3>
          <p>{form.education || "Your education details will appear here."}</p>
          <h3>Projects</h3>
          <p>{form.projects || "Your projects will appear here."}</p>
          <h3>Certifications</h3>
          <p>{form.certifications || "Your certifications will appear here."}</p>
        </div>
      </div>
    </section>
  );
}
