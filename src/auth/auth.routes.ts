import express from "express";
import { createUser, loginUser, refreshToken } from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/signup", createUser);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
