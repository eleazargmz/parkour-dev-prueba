import { db } from "@/lib/db/index";
import bcrypt from "bcrypt";

import { 
  UserId,
  NewUserParams,
  UpdateUserParams,
  userIdSchema,
  insertUserSchema,
  updateUserSchema,
  insertUserParams,
  updateUserParams, } from "@/schemas/customUserSchema"


export const createUser = async (user: NewUserParams) => {
  const newUser = insertUserSchema.parse(user);
  const { confirmPassword, ...userPayload } = newUser;
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: userPayload.email,
      },
    });
    if (existingUser) {
      throw new Error('El correo electrónico ya existe');
    }
    const hashedPassword = await bcrypt.hash(userPayload.password, 10);
    const u = await db.user.create({ data: {
      name: userPayload.name,
      email: userPayload.email,
      password: hashedPassword,},
    });
    return { user: u, status: 200 };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUser = async (id: UserId, user: UpdateUserParams) => {
  const { id: userId } = userIdSchema.parse({ id });
  const newUser = updateUserSchema.parse(user);
  try {
    const u = await db.user.update({ where: { id: userId }, data: newUser})
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUser = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  try {
    const u = await db.user.delete({ where: { id: userId }})
    return { user: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

