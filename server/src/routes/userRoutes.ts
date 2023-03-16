// Todo zdecydoac czy uzywac AS czy dekramentowac po { ... }
import * as UserController from "../controllers/userController"
import express from "express";

const router = express.Router();

router.get("/", UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;