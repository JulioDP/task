
import express from "express";
import AuthenticationControllers  from "../controllers/autentificacionControllers.js";
import { verificarSesion } from "../middleware/verifySession.js";

const authenticationControllers = new AuthenticationControllers();

const routerAuthentication = express.Router();
routerAuthentication.post('/login', authenticationControllers.login);
routerAuthentication.post('/register_user', authenticationControllers.registerUser);
routerAuthentication.post('/user_permission', verificarSesion , authenticationControllers.permisos);



export default routerAuthentication