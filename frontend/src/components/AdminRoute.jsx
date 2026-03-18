import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminRoute({ children }) {
  const { userInfo } = useAuth();
  if (!userInfo) return <Navigate to="/login/admin" replace />;
  return userInfo?.role === "admin" ? children : <Navigate to="/dashboard" replace />;
}
