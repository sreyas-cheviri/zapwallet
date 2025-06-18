import { z } from "zod";

 const userSignUpValidation = z.object({
  username: z.string().min(3, { message: "username must be atleast 2 chars" }),
  password: z
    .string()
    .min(6, { message: "password must atleast 6 chars" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least 1 special character",
    }),
  email: z.string().email({ message: "invalid email" }),
});

 const userSignInValidation = z.object({
  username: z.string().min(3, { message: "username must be atleast 2 chars" }),
  password: z.string().min(6, { message: "password must atleast 6 chars" }),
});

 const userAdd = z.object({
  username: z.string().min(3).optional(),
  password: z.string().min(6).regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least 1 special character",
    }).optional(),
  email: z.string().email().optional(),
});

export const validations ={
  userSignInValidation,
  userSignUpValidation,
  userAdd
}