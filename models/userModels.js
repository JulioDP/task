import {connectToDatabase, closeDB } from "../database/mongoDB.js";
import { ObjectId } from "mongodb";
import { validateUser, validateUserPartial } from "../schema/user.js";
import ErrorGeneral from "../error/error.js";
import InvalideData from "../error/invalideData.js";
import bcrypt from "bcrypt";
import { config } from "../config/config.js";

 export default class UserModels{

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
            
                    throw new ErrorGeneral(error.message)
            } finally{
                if(db){
                    await closeDB();    
                }
            }
        }
    }

     async deleteUser(id){
        let db;
        try {
            const objectId = new ObjectId(id);
            const query = { _id: objectId };
             db = await connectToDatabase()
            const collection = db.collection('usuarios');
            const resultDelete = await collection.deleteOne(query);
            if(resultDelete.deletedCount === 1 ) {
                return
            }else{
                throw new ErrorGeneral("No se pudo eliminar")
            }
        } catch (error) {
            throw new ErrorGeneral(error.message)
        }finally{
            if(db){
                closeDB();
            }
        }
     }

      async resetPassword(input){
        let db;
        try {
            const { email, password, newPasswordOne, newPasswordTwo } = input;
            console.log(input)
            let hashPassword;
            const result = validateUserPartial(input);
            if(!result.success) throw new InvalideData(result.error);
            if(newPasswordOne === newPasswordTwo){
                const resultNewValidate = validateUserPartial({"password": newPasswordOne});
            
                if(!resultNewValidate.success) throw new InvalideData("verify data");
                
                const salt = bcrypt.genSaltSync(config.saltRounts);
                 hashPassword = bcrypt.hashSync(password, salt);
            } else{
               
                throw new ErrorGeneral("Invalid password");
               
            }
            const queryFind = {email:email};
            
            const updatePasword = {
                $set: { password: hashPassword }
              };
            db  = await connectToDatabase();
            const collection =  db.collection("usuarios");
            const resultFind = await  collection.find(queryFind).toArray();
            
            if(resultFind){
                
                const correctPassword = bcrypt.compareSync(password, resultFind[0].password);
               
                if(correctPassword){
                    
                    const resultModify = await collection.updateOne(queryFind,updatePasword);
                    console.log(resultModify.modifiedCount)
                    if(!resultModify.modifiedCount === 1) throw new ErrorGeneral("error updating");
                }else{
                    throw new ErrorGeneral("password incorrect");
                }     
            }else{
                throw new ErrorGeneral("I dont existing result");
            }   
        } catch (error) {
            console.log(error.message)
            if(error instanceof InvalideData)  throw new InvalideData(error.message);
            if(error instanceof ErrorGeneral)  throw new ErrorGeneral(error.message);
            
        }
      }

      
}