import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../config/.env" });

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected using Mongoose");
    // Connection is established. Mongoose models can now be used.
  } catch (error) {
    console.error("Connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed successfully");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error.message);
    throw error;
  }
};