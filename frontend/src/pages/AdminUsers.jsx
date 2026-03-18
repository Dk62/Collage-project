import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const loadUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      setMessage("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateStatus = async (id, placementStatus) => {
    try {
      await api.put(`/users/${id}/placement-status`, { placementStatus });
      setMessage("Placement status updated");
      loadUsers();
    } catch (error) {
      setMessage("Status update failed");
    }
  };

  return (
    <div className="card">
      <h2>Manage Students</h2>
      {message && <p>{message}</p>}
      {users.map((user) => (
        <div key={user._id} className="card">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <p>College: {user.college || "N/A"}</p>
          <p>Applied Companies: {(user.appliedCompanies || []).length}</p>
          <select
            value={user.placementStatus || "preparing"}
            onChange={(e) => updateStatus(user._id, e.target.value)}
          >
            <option value="not_started">Not Started</option>
            <option value="preparing">Preparing</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="placed">Placed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
