import express from "express";
import { registerUser, loginUser, getUserProfile } from "./controllers.js";
import { authenticateToken } from "./middleware.js";

const router = express.Router();

// Enregistrement
router.post("/register", registerUser);

// Connexion
router.post("/login", loginUser);

// Profil utilisateur protégé
router.get("/profile", authenticateToken, getUserProfile);

export default router;
