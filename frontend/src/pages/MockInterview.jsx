import React, { useEffect, useState } from "react";
import api from "../services/api";
import { formatDateTime } from "../utils/helpers";

export default function MockInterview() {
  const [interviews, setInterviews] = useState([]);
  const [message, setMessage] = useState("");

  const loadInterviews = async () => {
    try {
      const { data } = await api.get("/interviews/my");
      setInterviews(data);
    } catch (error) {
      setMessage("Failed to load interviews");
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/interviews/${id}/status`, { status });
      setMessage("Interview status updated");
      loadInterviews();
    } catch (error) {
      setMessage("Status update failed");
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Mock Interview</h2>
        {message && <p>{message}</p>}
      </div>
      {interviews.length === 0 ? (
        <div className="card"><p>No interviews found.</p></div>
      ) : interviews.map((item) => (
        <div className="card" key={item._id}>
          <h3>{item.companyName || "Interview"}</h3>
          <p>Scheduled At: {formatDateTime(item.scheduledAt)}</p>
          <p>Status: {item.status}</p>
          <p>Feedback: {item.feedback || "No feedback yet"}</p>
          <button className="primary" onClick={() => updateStatus(item._id, "completed")}>Mark Completed</button>
          <button className="primary" onClick={() => updateStatus(item._id, "cancelled")}>Mark Cancelled</button>
        </div>
      ))}
    </div>
  );
}
