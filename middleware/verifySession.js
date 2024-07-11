
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';

const verificarSesion = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization?.split(' ')[1];
    
    
      try {
        let session = jwt.verify(token, config.secret_key);
        if(session) next()
     } catch(err) {
       if(err.message === "invalid signature") res.status(403).json({message: "Token no valido"});
       if(err.message === "jwt expired") res.status(403).json({message: "Token expirado"});
       if(err.message === "jwt must be provided") res.status(403).json({message: "jwt must be provided"});
     }
   
}

export{ verificarSesion}