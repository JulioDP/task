import { z } from "zod"

const VALUES = ["admin", "user", "inter"];

const accessPermissions = z.object({
    id: z.string().trim(),
    typePermission: z.enum(VALUES, 
        {
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
})


const validateAccessPermissions = (input) => {
    return accessPermissions.safeParse(input);
}

const validateParcialAccessPermissions = (input) => { return accessPermissions.parcial().safeParse(input) }

export {
    validateAccessPermissions,
    validateParcialAccessPermissions
}