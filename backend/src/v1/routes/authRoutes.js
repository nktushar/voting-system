import express from "express";
const router = express.Router();
import {UserRegister,UserLogin,GetUsers} from "../../controllers/authControllers.js"

//  Register route
router.post("/register", UserRegister);

router.post("/users", GetUsers);


// Login route
router.post("/login", UserLogin);

export default router;
