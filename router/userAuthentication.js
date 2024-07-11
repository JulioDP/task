
import express from "express";
import AuthenticationControllers  from "../controllers/autentificacionControllers.js";
import UserControllers from "../controllers/userControllers.js";
import { verificarSesion } from "../middleware/verifySession.js";

const authenticationControllers = new AuthenticationControllers();
const userControllers = new UserControllers();

const routerAuthentication = express.Router();
routerAuthentication.post('/login', authenticationControllers.login);
routerAuthentication.post('/register_user', userControllers.registerUser);
routerAuthentication.delete('/delete_account_user/:id', userControllers.deleteUser);
routerAuthentication.patch('/reset_acount_password', userControllers.resetPassword);

export default routerAuthentication