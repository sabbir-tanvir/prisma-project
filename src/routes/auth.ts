import { Router } from "express";
import signup from "../controller/auth";
import login from "../controller/auth";

const authRouter: Router = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);

export default authRouter;