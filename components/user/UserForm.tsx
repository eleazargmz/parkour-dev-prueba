"use client";
import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/user/useOptimisticUsers";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";



import { type User, insertUserParams } from "@/lib/db/schema/user";
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from "@/lib/actions/user";
import Link from "next/link";

const UserForm = ({

  user,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  user?: User | null;

  openModal?: (user?: User) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<User>(insertUserParams);
  const editing = !!user?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();
  const [error, setError] = useState("");

  const router = useRouter();
  const backpath = useBackPath("user");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: User },
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
    const pendingUser: User = {
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
        setError(error ?? "")

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingUser
        };

        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
        if (errorFormatted.error === "Error") {
          router.push('/sign-in');
        }
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-28 bg-gray-200">
      <form action={handleSubmit} onChange={handleChange} className={"px-12 py-8 shadow-xl bg-gray-50 rounded-2xl"}>
        {/* Schema fields start */}
        <div>
          <h1 className="w-full m-auto mb-4 text-black text-2xl font-bold text-center">
            Registro
          </h1>
          {error && <span className="text-xs text-red-500">{error}</span>}
          <Input
            type="text"
            name="name"
            placeholder="Username"
            className={cn(errors?.name ? "ring ring-destructive" : "")}
          />
          {errors?.name && (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.name}</p>
          )}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className={cn(errors?.email ? "ring ring-destructive" : "")}
          />
          {errors?.email && (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.email}</p>
          )}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className={cn(errors?.password ? "ring ring-destructive" : "")}
          />
          {errors?.password && (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.password}</p>
          )}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={cn(errors?.password ? "ring ring-destructive" : "")}
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
          className=" flex justify-center items-center mt-3 text-center text-green-600"
        >
          Login
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
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
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
      className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600 font-bold"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
