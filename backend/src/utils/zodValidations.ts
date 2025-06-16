import {z} from "zod"

export const userSignUpValidation = z.object({
    username : z.string().min(3 , {message : "username must be atleast 2 chars"}),
    password  : z.string().min(6, {message : "password must atleast 6 chars"}).regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least 1 special character",
    }),
    email  : z.string().email({message : "invalid email"})
})

export const userSignInValidation = z.object({
    username: z.string().min(3, {message: "username must be atleast 2 chars"}),
    password: z.string().min(6, {message: "password must atleast 6 chars"})
})

