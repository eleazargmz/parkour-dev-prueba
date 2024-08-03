import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type PersonalInformationId, personalInformationIdSchema } from "@/lib/db/schema/personalInformation";

export const getPersonalInformations = async () => {
  const { session } = await getUserAuth();
  const p = await db.personalInformation.findMany({ where: {userId: session?.user.id!}});
  return { personalInformation: p };
};

export const getPersonalInformationById = async (id: PersonalInformationId) => {
  const { session } = await getUserAuth();
  const { id: personalInformationId } = personalInformationIdSchema.parse({ id });
  const p = await db.personalInformation.findFirst({
    where: { id: personalInformationId, userId: session?.user.id!}});
  return { personalInformation: p };
};


