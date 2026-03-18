require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Company = require("./models/Company");
const Question = require("./models/Question");
const Quiz = require("./models/Quiz");
const Interview = require("./models/Interview");
const Result = require("./models/Result");
const { users, companies, questions } = require("./config/seedData");

const importData = async () => {
  try {
    await connectDB();
    await Promise.all([
      User.deleteMany(),
      Company.deleteMany(),
      Question.deleteMany(),
      Quiz.deleteMany(),
      Interview.deleteMany(),
      Result.deleteMany()
    ]);

    const createdUsers = await User.insertMany(await users());
    const createdCompanies = await Company.insertMany(companies);
    const createdQuestions = await Question.insertMany(questions);

    const quiz = await Quiz.create({
      title: "Starter Placement Quiz",
      questions: createdQuestions.map((q) => q._id),
      duration: 20
    });

    await Result.create({
      user: createdUsers[1]._id,
      quiz: quiz._id,
      score: 1,
      totalQuestions: 2
    });

    await Interview.create({
      user: createdUsers[1]._id,
      company: createdCompanies[0]._id,
      companyName: createdCompanies[0].name,
      scheduledAt: new Date(Date.now() + 86400000),
      mode: "online",
      status: "scheduled"
    });

    console.log("Seed data imported");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
