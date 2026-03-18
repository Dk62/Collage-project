import React, { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import api from "../services/api";

export default function AdminAnalytics() {
  const [data, setData] = useState({
    users: [],
    companies: [],
    quizzes: [],
    questions: []
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, companiesRes, quizzesRes, questionsRes] = await Promise.all([
          api.get("/users"),
          api.get("/companies"),
          api.get("/quizzes"),
          api.get("/questions")
        ]);
        setData({
          users: usersRes.data,
          companies: companiesRes.data,
          quizzes: quizzesRes.data,
          questions: questionsRes.data
        });
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const summaryData = [
    { name: "Users", count: data.users.length },
    { name: "Companies", count: data.companies.length },
    { name: "Quizzes", count: data.quizzes.length },
    { name: "Questions", count: data.questions.length }
  ];

  const placementData = [
    { name: "Not Started", value: data.users.filter((u) => u.placementStatus === "not_started").length },
    { name: "Preparing", value: data.users.filter((u) => u.placementStatus === "preparing").length },
    { name: "Applied", value: data.users.filter((u) => u.placementStatus === "applied").length },
    { name: "Interviewing", value: data.users.filter((u) => u.placementStatus === "interviewing").length },
    { name: "Placed", value: data.users.filter((u) => u.placementStatus === "placed").length }
  ];

  const topCompanies = useMemo(() => {
    const counts = {};
    data.users.forEach((user) => {
      (user.appliedCompanies || []).forEach((company) => {
        const key = company.name || "Unknown";
        counts[key] = (counts[key] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [data.users]);

  return (
    <div className="card">
      <h2>Admin Analytics</h2>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={placementData} dataKey="value" nameKey="name" outerRadius={100} label>
              {placementData.map((entry, index) => <Cell key={index} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={topCompanies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
