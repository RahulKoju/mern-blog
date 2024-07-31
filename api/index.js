import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
//import cors from "cors";
//import passport from "passport";
//import session from "express-session";
//import passportStrategy from "./services/passport.services.js";
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
app.use(cookieParser());
app.use(errorMiddleware);
// app.use(
//   session({
//     secret: "rahul", // Use a secure secret in production
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,
//   })
// );

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at port:${PORT}`);
});
