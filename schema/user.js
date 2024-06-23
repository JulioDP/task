import  { z } from "zod";

const userSchema = z.object(
    {
        username: z.string(
            {
                required_error: "Username is required",
                invalid_type_error: "Username must be a string",
              }
        ).trim(),
        email: z.string(
            {
                required_error: "email is required",	
                invalid_type_error: "email must be a string",
        
            }
        ).trim().email(),
        password: z.string({
            required_error: "Password is required",	
            invalid_type_error: "Password must be a string minimo 8 y uuid",
        }).min(8).trim(),
        
    }
);

const userSchemaPartial = z.object(
    {
        username: z.string(
            {
                required_error: "Username is required",
                invalid_type_error: "Username must be a string",
              }
        ).trim(),
        email: z.string(
            {
                required_error: "email is required",	
                invalid_type_error: "email must be a string",
        
            }
        ).trim().email(),
        password: z.string({
            required_error: "Password is required",	
            invalid_type_error: "Password must be a string minimo 8 y uuid",
        }).min(8).trim(),
        urlAutentificacion: z.string(
            {
                required_error: "url is required",
                invalid_type_error: "url must be a string",
              }
        ).url().trim(),
    }
);
const validateUser =  (input)=>{
     return userSchema.safeParse(input)
};


const validateUserPartial = (input) =>{
    return userSchemaPartial.partial().safeParse(input)
}
export {
    validateUser,
    validateUserPartial
}