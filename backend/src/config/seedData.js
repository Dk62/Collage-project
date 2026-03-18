const bcrypt = require("bcryptjs");

const users = async () => ([
  {
    name: "Admin User",
    email: "admin@portal.com",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
    college: "Ganga Global Institute",
    skills: ["MERN", "DSA"]
  },
  {
    name: "Student User",
    email: "student@portal.com",
    password: await bcrypt.hash("student123", 10),
    role: "student",
    college: "Ganga Global Institute",
    skills: ["Java", "React"]
  }
]);

const companies = [
  {
    name: "TCS",
    role: "Software Engineer",
    packageLPA: 4,
    eligibility: "BCA, 60% throughout",
    description: "Mass recruiter company",
  },
  {
    name: "Infosys",
    role: "Systems Engineer",
    packageLPA: 3.6,
    eligibility: "BCA, no active backlogs",
    description: "IT services and consulting",
  }
];

const questions = [
  {
    questionText: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correctAnswer: "O(log n)",
    category: "aptitude",
    difficulty: "easy"
  },
  {
    questionText: "Which hook is used for state in React?",
    options: ["useFetch", "useState", "useRoute", "useNode"],
    correctAnswer: "useState",
    category: "technical",
    difficulty: "easy"
  }
];

module.exports = { users, companies, questions };
