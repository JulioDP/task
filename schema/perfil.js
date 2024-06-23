import  { z } from "zod";

const perfilSchema = z.object({
    nombre: z.string({
        required_error: "nombre is required",
        invalid_type_error: "nombre must be a string"
    }).trim(), 
    correo: z.string({
        required_error: "correo is required",
        invalid_type_error: "correo must be a string"
    }).trim().email(), 
    telefono: z.string(
        {
            required_error: "telefono is required",
            invalid_type_error: "telefono must be a string"
        }
    ).trim().max(10),
    urlPerfil: z.string({
        required_error: "url is required",
        invalid_type_error: "url must be a string"
    }).trim().url(),
    descricion: z.string({
        required_error: "descripcion is required",
        invalid_type_error: "descripcion must be a string"
    }).trim().max(300)
});

const validatePerfil = (input)=>{
    return perfilSchema.safeParse(input)
}

const validatePerfilParcial = (input)=>{
    return perfilSchema.parcial().safeParse(input)  
}

export {
    validatePerfil,
    validatePerfilParcial
}