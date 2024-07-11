import ErrorGeneral from "../error/error.js";
import InvalideData from "../error/invalideData.js";
import UsuariosModel from "../models/authenticationModels.js";
const  usuarios = new UsuariosModel();

export default class AuthenticationControllers {

     async login(req, res){
        const data = req.body;
        try {
          const token =   await usuarios.login(data);
            res.status(200).json(token);
        } catch (error) {
            res.status(400).json({ error : JSON.parse(error.message)});
        }
     }

     async verifyEmail(req, res){

     }

      async permisos(req, res){
        usuarios.permission()
        res.json({success:"faltal"});
      }
}
