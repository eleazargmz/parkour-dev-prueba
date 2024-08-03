import { personalInformationSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { timestamps } from "@/lib/utils";
import { getPersonalInformation } from "@/lib/api/personalInformation/queries";


// Schema for personalInformation - used to validate API requests
const baseSchema = personalInformationSchema.omit(timestamps)

export const insertPersonalInformationSchema = baseSchema.omit({ id: true });
export const insertPersonalInformationParams = baseSchema.extend({
  ci: z.coerce.number(),
  phone: z.coerce.number(),
  salary: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updatePersonalInformationSchema = baseSchema;
export const updatePersonalInformationParams = updatePersonalInformationSchema.extend({
  ci: z.coerce.number(),
  phone: z.coerce.number(),
  salary: z.coerce.number()
}).omit({ 
  userId: true
});
export const personalInformationIdSchema = baseSchema.pick({ id: true });

// Types for personalInformation - used to type API request params and within Components
export type PersonalInformation = z.infer<typeof personalInformationSchema>;
export type NewPersonalInformation = z.infer<typeof insertPersonalInformationSchema>;
export type NewPersonalInformationParams = z.infer<typeof insertPersonalInformationParams>;
export type UpdatePersonalInformationParams = z.infer<typeof updatePersonalInformationParams>;
export type PersonalInformationId = z.infer<typeof personalInformationIdSchema>["id"];
    
// this type infers the return from getPersonalInformation() - meaning it will include any joins
export type CompletePersonalInformation = Awaited<ReturnType<typeof getPersonalInformation>>["personalInformation"][number];

