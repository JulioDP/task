import { validatePerfil, validatePerfilParcial } from "../schema/perfil.js"; 


const perfilUsuario = (req, res) =>{
     res.json({success: 'verificado'});
}


export { 
    perfilUsuario
}