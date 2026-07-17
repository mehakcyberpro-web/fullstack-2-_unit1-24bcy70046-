import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/postRoutes.js";

dotenv.config();

console.log("MongoDB URI:", process.env.MONGO_URI); 

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});