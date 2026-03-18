import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function QuizAttempt() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/quizzes/${id}`).then((res) => setQuiz(res.data)).catch(console.error);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post(`/quizzes/${id}/submit`, { answers });
    setResult(data);
  };

  if (!quiz) return <div className="card"><p>Loading quiz...</p></div>;

  return (
    <div>
      <form className="card" onSubmit={handleSubmit}>
        <h2>{quiz.title}</h2>
        {quiz.questions.map((q, index) => (
          <div key={q._id} className="card">
            <p><strong>Q{index + 1}.</strong> {q.questionText}</p>
            {q.options.map((option) => (
              <label key={option} style={{display:"block", marginBottom:"8px"}}>
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                />
                {" "}{option}
              </label>
            ))}
          </div>
        ))}
        <button className="primary" type="submit">Submit Quiz</button>
      </form>

      {result && (
        <div className="card">
          <h3>Result</h3>
          <p>Score: {result.score}/{result.totalQuestions}</p>
        </div>
      )}
    </div>
  );
}
