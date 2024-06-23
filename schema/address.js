import { z } from "zod"

const addressSchema = z.object({
    city: z.string({
        required_error: "city is required",
        invalid_type_error: "city must be a string",
    }).trim(),
    street : z.string(
       {
         required_error: "street is required",
        invalid_type_error: "street must be a string"
       }
    ).trim(),
    address : z.string(
        {
             required_error: "address is required",
             invalid_type_error: "address must be a string"
        }
    ).trim()
})

const validateAddressSchema = (input) =>{
    return addressSchema.safeParse(input)
}

const validateParcialAddressSchema = (input) =>{
    return  addressSchema.partial().safeParse(input)
}


export {
    validateAddressSchema,
    validateParcialAddressSchema
}