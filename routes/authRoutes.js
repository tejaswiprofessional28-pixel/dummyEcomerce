import express from 'express';
import { userRegister,  userLogin, getUser} from '../controller/authController.js';
import {authMiddleware} from "../middleware/authMiddleware.js";

const Router = express.Router();
Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.get("/getUser", authMiddleware, getUser);

export default Router;