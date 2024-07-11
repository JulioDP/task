import {connectToDatabase, closeDB } from "../database/mongoDB.js";
import {  validateUserPartial } from "../schema/user.js";
import ErrorGeneral from "../error/error.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import jwt from 'jsonwebtoken'

 export default class UsuariosModel{a

    async login(input) {
        const {username, password } = input;
        const result  = validateUserPartial(input);
        
        if( !result.success){
            throw new ErrorGeneral('Verifique sus datos')
        } else {
            try {
                const query = { username}; 
                const db = await connectToDatabase()
                const collection = db.collection('usuarios');
                const data = await collection.findOne(query);
                const userAccess = bcrypt.compareSync(password, data.password);
                
                if(!userAccess) throw new ErrorGeneral('Los datos no son correctos')
                    const token =    jwt.sign({ username: data.username }, config.secret_key, { expiresIn: 60 * 60 });
                    return {token}
            } catch (error) {
                return error.message
            }

        }
    }
    
    async verifyEmail(username){
        try {
            const query = {username}
           const db =  await connectToDatabase();
           const collection = db.collection('usuarios');
           const data = await collection.findOne(query);

           //enviar Email al usuario para validar


        } catch (error) {
            
        }
    }
     permission(){
        console.log("Permission");
    }

}