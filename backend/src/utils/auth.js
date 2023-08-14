import dotenv from 'dotenv';
// Load the environment variables from the '.env' file
dotenv.config();

import passport from "passport";
import localStrategy from "passport-local"; 
import UserModel from "../models/users.js";
import passportJWT from "passport-jwt";
const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// ...
const secret_key = process.env.JWT_SECRET;

// ...

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "studentId",
      passwordField: "password",
    },
    async (studentId, password, done) => {
      try {
        const user = await UserModel.findOne({ studentId });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// For varification of JWT token
passport.use(
    new JWTstrategy(
      {
        secretOrKey: secret_key,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );