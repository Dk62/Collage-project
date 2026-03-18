const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("DB connection failed: MONGO_URI is not set. Add your MongoDB Atlas connection string to backend/.env.");
    process.exit(1);
  }

  if (mongoUri.includes("<") || mongoUri.includes("your-")) {
    console.error("DB connection failed: MONGO_URI still contains placeholder text. Replace it with your real MongoDB Atlas connection string.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
