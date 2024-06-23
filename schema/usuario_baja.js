import { z } from "zod";

const usuarioBajaSchema = z.object({
    fechaBaja: z.string(
        {
            required_error: "fechaBaja is required",
            invalid_type_error: "fechaBaja must be a date"
        }
    ).trim().date(),
    motivo: z.string(
        {
            required_error: "motivo is required",
            invalid_type_error: "motivo must be a string"
        }
    ).trim().length(255),
    tipoSancion: z.enum(['extorsion','secuestro'])
})


const validateUsuarioBaja = (input) => { return usuarioBajaSchema.safeParse(input) }
const validateUsuarioBajaParcial = (input) => { return usuarioBajaSchema.parcial().safeParse(input) }

export { 
    validateUsuarioBaja,
    validateUsuarioBajaParcial
}