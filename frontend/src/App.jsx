import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import StudentRoute from "./components/StudentRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import QuizPage from "./pages/QuizPage";
import QuizAttempt from "./pages/QuizAttempt";
import Companies from "./pages/Companies";
import ResumeBuilder from "./pages/ResumeBuilder";
import MockInterview from "./pages/MockInterview";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Navigate to="/login/student" replace />} />
          <Route path="/login/student" element={<Login role="student" />} />
          <Route path="/login/admin" element={<Login role="admin" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:id" element={<StudentRoute><QuizAttempt /></StudentRoute>} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile" element={<StudentRoute><Profile /></StudentRoute>} />
          <Route path="/resume" element={<StudentRoute><ResumeBuilder /></StudentRoute>} />
          <Route path="/mock-interview" element={<StudentRoute><MockInterview /></StudentRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/manage" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/admin/analytics" element={<AdminRoute><AdminAnalytics /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/dashboard" element={<StudentRoute><Dashboard /></StudentRoute>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
