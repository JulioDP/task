import e from "express";
import ErrorGeneral from "../error/error.js";
import InvalideData from "../error/invalideData.js";
import UserModels from "../models/userModels.js";

const usuarios = new UserModels();

export default class UserControllers{

    async registerUser(req, res) {
        try { 
            const data = req.body;
            await usuarios.registerUser(data);
            //envbiar correo electronico para confirma
            res.json({ message: "Usuario registrado exitosamente" });
        } catch (error) {
             const duplicate = error.message.split(" ")[1];  
             if(duplicate === "duplicate") res.status(500).json({ms: "Ya existe es correo registrado"});
            if(error instanceof InvalideData) res.status(500).json({error: JSON.parse(error.message)});
            if(error instanceof ErrorGeneral) res.status(500).json({ms: error.message});
        }
    }
     async deleteUser(req, res) {
       try {
        const {id} = req.params;

        await usuarios.deleteUser(id);
        res.status(200).json({ms:"ok"});
       } catch (error) {
        console.log(error.message)
            res.status(500).json({ms:"error"});
       }
     }

    async resetPassword(req, res){
        try {
            const data = req.body;
            await usuarios.resetPassword(data);
            res.status(200).json({ms:"success"});
        } catch (error) {
            
            if(error instanceof InvalideData) return res.status(403).json({ms: JSON.parse(error.message )});
            if(error instanceof ErrorGeneral) return res.status(500).json({ms:error.message});
           
        }
    }
}
