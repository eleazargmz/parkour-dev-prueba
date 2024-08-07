import { db } from "@/lib/db/index";
import { 
  PersonalInformationId, 
  NewPersonalInformationParams,
  UpdatePersonalInformationParams, 
  updatePersonalInformationSchema,
  insertPersonalInformationSchema, 
  personalInformationIdSchema 
} from "@/lib/db/schema/personalInformation";
import { getUserAuth } from "@/lib/auth/utils";

export const createPersonalInformation = async (personalInformation: NewPersonalInformationParams) => {
  const { session } = await getUserAuth();
  const newPersonalInformation = insertPersonalInformationSchema.parse({ 
    ...personalInformation, 
    phone: personalInformation.phone,
    userId: session?.user.id! 
  });
  try {
    const p = await db.personalInformation.create({ data: newPersonalInformation });
    return { personalInformation: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updatePersonalInformation = async (id: PersonalInformationId, personalInformation: UpdatePersonalInformationParams) => {
  const { session } = await getUserAuth();
  const { id: personalInformationId } = personalInformationIdSchema.parse({ id });
  const newPersonalInformation = updatePersonalInformationSchema.parse({ ...personalInformation, userId: session?.user.id! });
  try {
    const p = await db.personalInformation.update({ where: { id: personalInformationId, userId: session?.user.id! }, data: newPersonalInformation})
    return { personalInformation: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deletePersonalInformation = async (id: PersonalInformationId) => {
  const { session } = await getUserAuth();
  const { id: personalInformationId } = personalInformationIdSchema.parse({ id });
  try {
    const p = await db.personalInformation.delete({ where: { id: personalInformationId, userId: session?.user.id! }})
    return { personalInformation: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

