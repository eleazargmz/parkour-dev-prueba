import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
};



export type Action = "crear" | "actualizar" | "eliminar";

export type OptimisticAction<T> = {
  action: Action;
  data: T;
};
