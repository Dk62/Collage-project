import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import api from "../services/api";
import { formatDateTime } from "../utils/helpers";

export default function Dashboard() {
  const [stats, setStats] = useState({ totalAttempts: 0, averagePercentage: 0 });
  const [results, setResults] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsRes, resultsRes, interviewsRes, profileRes] = await Promise.all([
          api.get("/results/stats/me"),
          api.get("/results/my"),
          api.get("/interviews/my"),
          api.get("/users/profile")
        ]);
        setStats(statsRes.data);
        setResults(resultsRes.data);
        setInterviews(interviewsRes.data);
        setProfile(profileRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const chartData = results.map((item, index) => ({
    name: item.quiz?.title || `Quiz ${index + 1}`,
    score: item.totalQuestions ? Math.round((item.score / item.totalQuestions) * 100) : 0
  }));

  return (
    <div>
      <div className="card">
        <h2>Student Dashboard</h2>
        <p>Placement status: <strong>{profile?.placementStatus || "preparing"}</strong></p>
        <p>Applied companies: <strong>{profile?.appliedCompanies?.length || 0}</strong></p>
      </div>
      <div className="grid">
        <div className="stat"><h3>Total Attempts</h3><p>{stats.totalAttempts}</p></div>
        <div className="stat"><h3>Average Score</h3><p>{stats.averagePercentage}%</p></div>
        <div className="stat"><h3>Upcoming Interviews</h3><p>{interviews.filter((i) => i.status === "scheduled").length}</p></div>
      </div>

      <div className="card">
        <h3>Quiz Performance Chart</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Recent Results</h3>
        {results.length === 0 ? <p>No results yet.</p> : results.map((item) => (
          <div key={item._id}>
            <p>{item.quiz?.title || "Quiz"}: {item.score}/{item.totalQuestions}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3>Interview Schedule</h3>
        {interviews.length === 0 ? <p>No interviews scheduled.</p> : interviews.map((item) => (
          <div key={item._id}>
            <p>{item.companyName || item.company?.name || "Company"} - {formatDateTime(item.scheduledAt)} - {item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
