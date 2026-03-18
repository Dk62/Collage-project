import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const firstName = userInfo?.name?.trim()?.split(" ")[0] || "Student";
  const roleLabel = userInfo?.role === "admin" ? "Admin" : "Candidate";
  const brandTarget = userInfo?.role === "admin" ? "/admin/dashboard" : userInfo?.role === "student" ? "/dashboard" : "/";

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/companies", label: "Companies" },
    { to: "/quiz", label: "Quiz Practice" },
  ];

  const studentLinks = [
    { to: "/profile", label: "Profile" },
    { to: "/resume", label: "Resume Lab" },
    { to: "/mock-interview", label: "Mock Interview" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const adminLinks = [
    { to: "/admin/dashboard", label: "Admin" },
    { to: "/admin/manage", label: "Manage" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/analytics", label: "Analytics" },
  ];

  const renderNavLink = ({ to, label }) => (
    <NavLink
      key={to}
      to={to}
      className={({ isActive }) => `site-nav-link${isActive ? " site-nav-link-active" : ""}`}
    >
      {label}
    </NavLink>
  );

  return (
    <nav className="site-header">
      <div className="site-header-inner">
        <Link to={brandTarget} className="site-brand">
          <span className="site-brand-mark">PP</span>
          <span className="site-brand-copy">
            <strong>Placement Portal</strong>
            <small>Campus prep workspace</small>
          </span>
        </Link>

        <div className="site-nav-cluster">
          <div className="site-nav-links">
            {publicLinks.map(renderNavLink)}
            {userInfo?.role === "student" && studentLinks.map(renderNavLink)}
            {userInfo?.role === "admin" && adminLinks.map(renderNavLink)}
          </div>

          <div className="site-nav-actions">
            {userInfo ? (
              <>
                <div className="site-user-chip">
                  <span className="site-user-chip-label">{roleLabel}</span>
                  <strong>{firstName}</strong>
                </div>
                <NotificationBell className="nav-notifications" />
                <button
                  className="site-logout-button"
                  onClick={() => {
                    const nextLogin = userInfo?.role === "admin" ? "/login/admin" : "/login/student";
                    logout();
                    navigate(nextLogin);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login/student"
                  className={({ isActive }) => `site-nav-link${isActive ? " site-nav-link-active" : ""}`}
                >
                  Student Login
                </NavLink>
                <NavLink
                  to="/login/admin"
                  className={({ isActive }) => `site-nav-link${isActive ? " site-nav-link-active" : ""}`}
                >
                  Admin Login
                </NavLink>
                <Link to="/register" className="site-nav-cta">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
