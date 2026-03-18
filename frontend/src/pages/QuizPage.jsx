import React, { useEffect, useState } from "react";
import api from "../services/api";
import QuizCard from "../components/QuizCard";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get("/quizzes").then((res) => setQuizzes(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 ? <p>No quizzes available.</p> : quizzes.map((quiz) => (
        <QuizCard key={quiz._id} id={quiz._id} title={quiz.title} duration={quiz.duration} />
      ))}
    </div>
  );
}
