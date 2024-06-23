
// Middleware personalizado para capturar errores de JSON malformado
const validarJson = (err, req, res, next)=> {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: 'El JSON recibido está malformado' });
    }
    next();
}


  export { validarJson }