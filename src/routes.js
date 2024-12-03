import express from "express";
import { registerUser, loginUser } from "./controllers.js";
import { authenticateToken } from "./middleware.js";

const router = express.Router();

router.post("/register", registerUser);


router.post("/login", loginUser);


export default router;
