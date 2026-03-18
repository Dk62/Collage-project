import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="footer-brand-mark">PP</span>
            <div className="footer-brand-copy">
              <strong>Placement Portal</strong>
              <p>
                A focused workspace for quiz preparation, resume building, company tracking, and interview readiness.
              </p>
            </div>
          </div>

          <div className="footer-highlight">
            <span className="footer-tag">Built for placement season</span>
            <p>Prepare consistently, stay organized, and move into campus drives with a cleaner process.</p>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-link-group">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/companies">Companies</Link>
            <Link to="/quiz">Quiz Practice</Link>
          </div>

          <div className="footer-link-group">
            <h3>Preparation</h3>
            <Link to="/resume">Resume Lab</Link>
            <Link to="/mock-interview">Mock Interview</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>

          <div className="footer-link-group">
            <h3>Portal Focus</h3>
            <span>Aptitude and technical practice</span>
            <span>Application-ready profile building</span>
            <span>Interview and company preparation</span>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>Copyright (c) {year} Placement Portal. All rights reserved.</span>
        <span>Designed for college placement preparation workflows.</span>
      </div>
    </footer>
  );
}
