"use server";

import { revalidatePath } from "next/cache";
import {
  createPersonalInformation,
  deletePersonalInformation,
  updatePersonalInformation,
} from "@/lib/api/personalInformation/mutations";
import {
  PersonalInformationId,
  NewPersonalInformationParams,
  UpdatePersonalInformationParams,
  personalInformationIdSchema,
  insertPersonalInformationParams,
  updatePersonalInformationParams,
} from "@/lib/db/schema/personalInformation";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePersonalInformations = () => revalidatePath("/personal-information");

export const createPersonalInformationAction = async (input: NewPersonalInformationParams) => {
  console.log("createPersonalInformationAction ===> ", input)
  try {
    const payload = insertPersonalInformationParams.parse(input);
    console.log("payload ======> ", payload)
    await createPersonalInformation(payload);
    revalidatePersonalInformations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePersonalInformationAction = async (input: UpdatePersonalInformationParams) => {
  try {
    const payload = updatePersonalInformationParams.parse(input);
    await updatePersonalInformation(payload.id, payload);
    revalidatePersonalInformations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePersonalInformationAction = async (input: PersonalInformationId) => {
  try {
    const payload = personalInformationIdSchema.parse({ id: input });
    await deletePersonalInformation(payload.id);
    revalidatePersonalInformations();
  } catch (e) {
    return handleErrors(e);
  }
};