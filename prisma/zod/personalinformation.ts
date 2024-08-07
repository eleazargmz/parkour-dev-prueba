import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const personalInformationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "El Nombre es obligatorio y no puede estar vacío."}),
  ci: z.string().min(7, { message: "La Cedula debe tener minimo 7 dígitos." }),
  phone: z.string().length(11, { message: "El campo Teléfono debe tener 10 dígitos." }),
  address: z.string().min(3, { message: "El campo Dirección es obligatorio y no puede estar vacío." }),
  salary: z.number().int().gte(1, { message: "El campo Salario debe ser un número positivo." }),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePersonalInformation extends z.infer<typeof personalInformationSchema> {
  user: CompleteUser
}

/**
 * relatedPersonalInformationSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPersonalInformationSchema: z.ZodSchema<CompletePersonalInformation> = z.lazy(() => personalInformationSchema.extend({
  user: relatedUserSchema,
}))
