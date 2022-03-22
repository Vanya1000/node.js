import Router from "express";
import AuthController from "./auth.controller.js";

import { check } from "express-validator" // подключаем midleware для валидации
import authMiddleware from "../middleware/authMiddleware.js";


const authRouter = new Router()

authRouter.post('/registration', [
	check('username', "Username should not be empty").notEmpty(),
	check('password', "Password should be at least 4 characters").isLength({ min: 4, max: 20 })
], AuthController.registration)
authRouter.post('/login', AuthController.login)
authRouter.get('/users', authMiddleware, AuthController.getUsers)// добавляем midleware

export default authRouter;

