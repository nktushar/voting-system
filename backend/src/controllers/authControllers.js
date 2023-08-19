import dotenv from "dotenv";
// Load the environment variables from the '.env' file
dotenv.config();
import passport from "passport";
import jwt from "jsonwebtoken";
import * as AuthServices from "../services/authServices.js";
const secret_key = process.env.JWT_SECRET;

export const UserRegister = async (req, res, next) => {
  const user = await AuthServices.UserRegister(req.body);
  res.json({
    message: "Signup successful",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      studentId: user.studentId,
    },
  });
};

export const GetUsers = async (req, res) => {
  const users = await AuthServices.GetUsers();
  res.json({
    message: "Users fetched successfully",
    users: users,
  });
};

export const UserLogin = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        return res.json({ error: true, message: info });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = {
          _id: user._id,
          email: user.email,
          fullName: user.fullName,
          studentId: user.studentId,
          role: user.role,
        };
        // Generate token
        const token = jwt.sign({ user: body }, secret_key);

        return res.json({ token, user: body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
