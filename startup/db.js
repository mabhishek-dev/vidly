import mongoose from "mongoose";
import winston from "winston";

export default function () {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => winston.info("Connected to MongoDB..."))
    .catch((err) => {
      winston.error("Could not connect to MongoDB...", err);
      process.exit(1);
    });
}
