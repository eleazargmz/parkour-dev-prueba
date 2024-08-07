import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const personalInformationSchema = z.object({
  id: z.string(),
  name: z.string(),
  ci: z.string(),
  phone: z.string(),
  address: z.string(),
  salary: z.number().int(),
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
