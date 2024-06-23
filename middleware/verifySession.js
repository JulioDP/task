
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';

const verificarSesion = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization.split(' ')[1];
    console.log(token)
    console.log(config.secret_key)
    try {
         let session = jwt.verify(token, config.secret_key);
         if(session) next()
      } catch(err) {
        res.status(403).json({message: "Token no valido"});
      }
   
}

export{ verificarSesion}