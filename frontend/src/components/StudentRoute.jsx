import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function StudentRoute({ children }) {
  const { userInfo } = useAuth();

  if (!userInfo) return <Navigate to="/login/student" replace />;
  return userInfo?.role === "student" ? children : <Navigate to="/admin/dashboard" replace />;
}
