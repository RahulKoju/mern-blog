import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import passportStrategy from "./services/passport.services.js";
const PORT = process.env.PORT || 8000;

//Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(console.log("MongoDB is connected!!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

//Middlewares
app.use(express.json());
app.use(errorMiddleware);
app.use(
  cookieSession({
    name: "session",
    keys: ["rahul"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//Routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port:${PORT}`);
});
