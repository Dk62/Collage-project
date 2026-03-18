import React from "react";
import { Link } from "react-router-dom";

export default function QuizCard({ id, title, duration }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Duration: {duration} minutes</p>
      <Link to={`/quiz/${id}`}>Start Quiz</Link>
    </div>
  );
}
