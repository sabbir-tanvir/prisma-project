import { Router } from "express";
import signup from "../controller/auth";
import login from "../controller/auth";
import { errorhandler } from "../erhandler";

const authRouter: Router = Router();

authRouter.post('/signup', errorhandler(signup));
authRouter.post('/login', errorhandler(login));

export default authRouter;