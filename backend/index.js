import dotenv from "dotenv";
// Load the environment variables from the '.env' file
dotenv.config();

import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from "./src/v1/routes/authRoutes.js";
import noticeRoutes from "./src/v1/routes/noticeRoutes.js";
import clubRoutes from "./src/v1/routes/clubRoutes.js";
import positionRoutes from "./src/v1/routes/positionRoutes.js";
import candidateRoutes from "./src/v1/routes/candidateRoutes.js";
import voteRoutes from "./src/v1/routes/voteRoutes.js";
import passport from "passport";
import "./src/utils/auth.js";

// import RegisterModel, { create } from './models/Register';

const app = express();

// Import the 'dotenv' module

app.use(json());
app.use(cors());
console.log(process.env.MONGODB_URL);
connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
    console.log(error);
  });

// app.post("/register", (req, res) => {
//     create(req.body).then((data) => {
//         res.json(data);
//     }
//     ).catch((error) => {
//         res.json({error: true, message: error});
//     }
//     );
// });

app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: "Hello World" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notice", noticeRoutes);
app.use("/api/v1/club", clubRoutes);
app.use("/api/v1/position", positionRoutes);
app.use("/api/v1/candidate", candidateRoutes);
app.use(
  "/api/v1/vote",
  passport.authenticate("jwt", { session: false }),
  voteRoutes
);

// app.use("/api/v1", newRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
