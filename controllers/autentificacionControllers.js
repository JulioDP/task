import ErrorGeneral from "../error/error.js";
import InvalideData from "../error/invalideData.js";
import UsuariosModel from "../models/authenticationModels.js";
const  usuarios = new UsuariosModel();

export default class AuthenticationControllers {
  
    async registerUser(req, res) {
        try { 
            const data = req.body;
            await usuarios.registerUser(data);
            //envbiar correo electronico para confirma
            res.json({ message: "Usuario registrado exitosamente" });
        } catch (error) {
            if(error instanceof InvalideData) res.status(500).json({error: JSON.parse(error.message)});
            if(error instanceof ErrorGeneral) res.status(500).json({ms: error.message});
        }
    }

     async login(req, res){
        const data = req.body;
        try {
          const token =   await usuarios.login(data);
            res.status(200).json(token);
        } catch (error) {
            res.status(400).json({ error : JSON.parse(error.message)});
        }
     }

      async permisos(req, res){
        usuarios.permission()
        res.json({success:"faltal"});
      }
}
