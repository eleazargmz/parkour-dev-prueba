import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompletePersonalInformation, relatedPersonalInformationSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {message: "El nombre es obligatorio"}),
  email: z.string().email({ message: "Dirección de correo electrónico no válida" }),
  emailVerified: z.date().nullish(),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  personalInformation: CompletePersonalInformation[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  personalInformation: relatedPersonalInformationSchema.array(),
}))
