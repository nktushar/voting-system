import express from "express";
const router = express.Router();
import {UserRegister,UserLogin} from "../../controllers/authControllers.js"

//  Register route
router.post("/register", UserRegister);

// Login route
router.post("/login", UserLogin);

export default router;
