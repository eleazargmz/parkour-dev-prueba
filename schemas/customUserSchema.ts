import * as z from "zod"
import { timestamps } from "@/lib/utils";
import { getUsers } from "@/lib/api/user/queries";


export const customUserSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {message: "El nombre es obligatorio"}),
  email: z.string().email({ message: "Dirección de correo electrónico no válida" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  emailVerified: z.date().nullable().default(null),
  confirmPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})


export type UserSchema = z.infer<typeof customUserSchema>;

const baseSchema = customUserSchema.omit(timestamps)

export const insertUserSchema = baseSchema.omit({ id: true });
export const insertUserParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateUserSchema = baseSchema;
export const updateUserParams = updateUserSchema.extend({})
export const userIdSchema = baseSchema.pick({ id: true });

// Types for user - used to type API request params and within Components
export type User = z.infer<typeof customUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];
    
// this type infers the return from getUser() - meaning it will include any joins
export type CompleteUser = Awaited<ReturnType<typeof getUsers>>["user"][number];

