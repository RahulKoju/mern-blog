import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("MongoDB is connected!!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.use("/api/auth",authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port:${PORT}`);
});
