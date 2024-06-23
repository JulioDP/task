import {connectToDatabase, closeDB } from "../database/mongoDB.js";
import { validateUser, validateUserPartial } from "../schema/user.js";
import ErrorGeneral from "../error/error.js";
import InvalideData from "../error/invalideData.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";
import jwt from 'jsonwebtoken'

 export default class UsuariosModel{

    async registerUser(input){
        const { password } = input;
        const result = validateUser(input);
        let db;

        if( !result.success ) {
            throw new InvalideData(result.error)
        }else{
            try {
                const salt = bcrypt.genSaltSync(config.saltRounts);
                const hash = bcrypt.hashSync(password, salt);
                input.password = hash;

                const dataAccess = {
                    ...input,
                    authentication: false,
                    fechaAlta: new Date()
                }

                db = await connectToDatabase();
                const collection = db.collection('usuarios');
                await collection.insertOne(dataAccess) 
            } catch (error) {
                console.log(error.message)
                    throw new ErrorGeneral(error.message)
            } finally{
                if(db){
                    await closeDB();    
                }
            }
        }
    }

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
    
     permission(){
        console.log("Permission");
    }

}