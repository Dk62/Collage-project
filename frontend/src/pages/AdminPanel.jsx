import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminPanel() {
  const emptyCompany = { name: "", role: "", packageLPA: "", eligibility: "", description: "" };
  const emptyQuestion = { questionText: "", options: "", correctAnswer: "", category: "aptitude", difficulty: "easy" };
  const emptyQuiz = { title: "", questions: "", duration: 30 };

  const [company, setCompany] = useState(emptyCompany);
  const [question, setQuestion] = useState(emptyQuestion);
  const [quiz, setQuiz] = useState(emptyQuiz);
  const [message, setMessage] = useState("");
  const [companies, setCompanies] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);

  const loadAll = async () => {
    const [c, q, z] = await Promise.all([api.get("/companies"), api.get("/questions"), api.get("/quizzes")]);
    setCompanies(c.data);
    setQuestions(q.data);
    setQuizzes(z.data);
  };

  useEffect(() => { loadAll(); }, []);

  const submitCompany = async (e) => {
    e.preventDefault();
    const payload = { ...company, packageLPA: Number(company.packageLPA) };
    if (editingCompanyId) {
      await api.put(`/companies/${editingCompanyId}`, payload);
      setMessage("Company updated");
    } else {
      await api.post("/companies", payload);
      setMessage("Company created");
    }
    setCompany(emptyCompany);
    setEditingCompanyId(null);
    loadAll();
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    const payload = { ...question, options: question.options.split(",").map((x) => x.trim()) };
    if (editingQuestionId) {
      await api.put(`/questions/${editingQuestionId}`, payload);
      setMessage("Question updated");
    } else {
      await api.post("/questions", payload);
      setMessage("Question created");
    }
    setQuestion(emptyQuestion);
    setEditingQuestionId(null);
    loadAll();
  };

  const submitQuiz = async (e) => {
    e.preventDefault();
    const payload = { ...quiz, questions: quiz.questions.split(",").map((x) => x.trim()), duration: Number(quiz.duration) };
    if (editingQuizId) {
      await api.put(`/quizzes/${editingQuizId}`, payload);
      setMessage("Quiz updated");
    } else {
      await api.post("/quizzes", payload);
      setMessage("Quiz created");
    }
    setQuiz(emptyQuiz);
    setEditingQuizId(null);
    loadAll();
  };

  const deleteItem = async (type, id) => {
    await api.delete(`/${type}/${id}`);
    loadAll();
  };

  const editCompany = (item) => {
    setCompany({
      name: item.name,
      role: item.role,
      packageLPA: item.packageLPA,
      eligibility: item.eligibility,
      description: item.description || ""
    });
    setEditingCompanyId(item._id);
  };

  const editQuestion = (item) => {
    setQuestion({
      questionText: item.questionText,
      options: item.options.join(", "),
      correctAnswer: item.correctAnswer,
      category: item.category,
      difficulty: item.difficulty
    });
    setEditingQuestionId(item._id);
  };

  const editQuiz = (item) => {
    setQuiz({
      title: item.title,
      questions: (item.questions || []).map((q) => q._id || q).join(", "),
      duration: item.duration
    });
    setEditingQuizId(item._id);
  };

  return (
    <div>
      <div className="card"><h2>Admin Panel</h2>{message && <p>{message}</p>}</div>

      <form className="card" onSubmit={submitCompany}>
        <h3>{editingCompanyId ? "Edit Company" : "Create Company"}</h3>
        <input value={company.name} placeholder="Company Name" onChange={(e) => setCompany({ ...company, name: e.target.value })} />
        <input value={company.role} placeholder="Role" onChange={(e) => setCompany({ ...company, role: e.target.value })} />
        <input value={company.packageLPA} placeholder="Package LPA" onChange={(e) => setCompany({ ...company, packageLPA: e.target.value })} />
        <input value={company.eligibility} placeholder="Eligibility" onChange={(e) => setCompany({ ...company, eligibility: e.target.value })} />
        <textarea value={company.description} placeholder="Description" onChange={(e) => setCompany({ ...company, description: e.target.value })} />
        <button className="primary" type="submit">{editingCompanyId ? "Update Company" : "Save Company"}</button>
      </form>

      <div className="card">
        <h3>Company List</h3>
        {companies.map((item) => (
          <div key={item._id}>
            <p>{item.name} - {item.role}</p>
            <button className="primary" onClick={() => editCompany(item)}>Edit</button>
            <button className="primary" onClick={() => deleteItem("companies", item._id)}>Delete</button>
          </div>
        ))}
      </div>

      <form className="card" onSubmit={submitQuestion}>
        <h3>{editingQuestionId ? "Edit Question" : "Create Question"}</h3>
        <textarea value={question.questionText} placeholder="Question" onChange={(e) => setQuestion({ ...question, questionText: e.target.value })} />
        <input value={question.options} placeholder="Options comma separated" onChange={(e) => setQuestion({ ...question, options: e.target.value })} />
        <input value={question.correctAnswer} placeholder="Correct Answer" onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })} />
        <button className="primary" type="submit">{editingQuestionId ? "Update Question" : "Save Question"}</button>
      </form>

      <div className="card">
        <h3>Question List</h3>
        {questions.map((item) => (
          <div key={item._id}>
            <p>{item.questionText}</p>
            <button className="primary" onClick={() => editQuestion(item)}>Edit</button>
            <button className="primary" onClick={() => deleteItem("questions", item._id)}>Delete</button>
          </div>
        ))}
      </div>

      <form className="card" onSubmit={submitQuiz}>
        <h3>{editingQuizId ? "Edit Quiz" : "Create Quiz"}</h3>
        <input value={quiz.title} placeholder="Quiz Title" onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
        <input value={quiz.questions} placeholder="Question IDs comma separated" onChange={(e) => setQuiz({ ...quiz, questions: e.target.value })} />
        <input value={quiz.duration} placeholder="Duration" onChange={(e) => setQuiz({ ...quiz, duration: e.target.value })} />
        <button className="primary" type="submit">{editingQuizId ? "Update Quiz" : "Save Quiz"}</button>
      </form>

      <div className="card">
        <h3>Quiz List</h3>
        {quizzes.map((item) => (
          <div key={item._id}>
            <p>{item.title}</p>
            <button className="primary" onClick={() => editQuiz(item)}>Edit</button>
            <button className="primary" onClick={() => deleteItem("quizzes", item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
