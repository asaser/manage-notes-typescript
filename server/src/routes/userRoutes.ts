// Todo zdecydoac czy uzywac AS czy dekramentowac po { ... }
import * as UserController from "../controllers/userController"
import express from "express";
import { requestAuth } from "../../middleware/auth";

const router = express.Router();

// sprawdzamy czy User jest AuTH a potem wykonujemy kolejna rzecz
router.get("/", requestAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;