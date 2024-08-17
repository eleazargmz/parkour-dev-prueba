"use client";
import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/user/useOptimisticUsers";

// import { input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";



// import { type User, insertUserParams } from "@/lib/db/schema/user";
import { type UserSchema, insertUserParams } from "@/schemas/customUserSchema"
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from "@/lib/actions/user";
import Link from "next/link";
import clsx from "clsx";
import { setTimeout } from "timers";

const UserForm = ({

  user,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  user?: UserSchema | null;

  openModal?: (user?: UserSchema) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<UserSchema>(insertUserParams);
  const editing = !!user?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();
  const backpath = useBackPath("user");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: UserSchema },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`User ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);
    const payload = Object.fromEntries(data.entries());

    if (payload.password !== payload.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setTimeout(() => {
        setError("")
      }, 7000);
      return;
    }

    const userParsed = await insertUserParams.safeParseAsync({ ...payload });
    if (!userParsed.success) {
      setErrors(userParsed?.error.flatten().fieldErrors);
      return;
    }
    closeModal && closeModal();
    const values = userParsed.data;
    const pendingUser: UserSchema = {
      updatedAt: user?.updatedAt ?? new Date(),
      createdAt: user?.createdAt ?? new Date(),
      id: user?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingUser,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateUserAction({ ...values, id: user.id })
          : await createUserAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingUser
        };

        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );

        if (error) {
          setError(error ?? "")
          setTimeout(() => {
            setError("")
            router.push('/sign-in');
          }, 8000);
        }

        // if (errorFormatted.error === "Error") {
        //   router.push('/sign-in');
        // }
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-28 bg-gray-200 min-h-screen">
      <div className={"px-12 py-8 shadow-xl bg-gray-50 rounded-2xl w-96"}>
        {error === "EmailVerification" ? <span className="text-lg text-blue-600">Por favor, verifica tu correo electrónico para completar la verificación</span> :
          <form action={handleSubmit} onChange={handleChange}>
            {/* Schema fields start */}
            <div>
              <h1 className="w-full m-auto mb-4 text-teal-600 text-2xl font-bold text-center">
                Registro
              </h1>
              {error && <span className="text-xs text-red-500">{error}</span>}
              <input
                type="text"
                name="name"
                placeholder="Nombre de usuario"
                className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
              />
              {errors?.name && (
                <p className="text-xs text-destructive text-red-500 mt-2">{errors.name}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
              />
              {errors?.email && (
                <p className="text-xs text-destructive text-red-500 mt-2">{errors.email}</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
              />
              {errors?.password && (
                <p className="text-xs text-destructive text-red-500 mt-2">{errors.password}</p>
              )}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                className="block w-full p-2 my-2 bg-gray-100 text-black border-2 border-gray-300 rounded"
                defaultValue={user?.password ?? ""}
              />
              {errors?.confirmPassword && (
                <p className="text-xs text-destructive text-red-500 mt-2">{errors.confirmPassword[0]}</p>
              )}
            </div>
            {/* Schema fields end */}

            {/* Save Button */}
            <SaveButton errors={hasErrors} editing={editing} />
            <Link
              href="/sign-in"
              className=" flex justify-center items-center mt-3 text-center text-teal-600"
            >
              Iniciar sesión
            </Link>

            {/* Delete Button */}
            {editing ? (
              <Button
                type="button"
                disabled={isDeleting || pending || hasErrors}
                variant={"destructive"}
                onClick={() => {
                  setIsDeleting(true);
                  closeModal && closeModal();
                  startMutation(async () => {
                    addOptimistic && addOptimistic({ action: "delete", data: user });
                    const error = await deleteUserAction(user.id);
                    setIsDeleting(false);
                    const errorFormatted = {
                      error: error ?? "Error",
                      values: user,
                    };

                    onSuccess("delete", error ? errorFormatted : undefined);
                  });
                }}
              >
                Eliminar{isDeleting ? "..." : ""}
              </Button>
            ) : null}
          </form>
        }
      </div>
    </div>
  );
};

export default UserForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="w-full p-2 mt-2 text-white bg-teal-500 rounded hover:bg-teal-600 font-bold"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
