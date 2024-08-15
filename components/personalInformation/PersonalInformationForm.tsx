import { z } from "zod";

import { useEffect, ChangeEvent, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";
import { v4 as uuidv4 } from 'uuid';

import { type Action, cn } from "@/lib/utils";
// import { type TAddOptimistic } from "@/app/(app)/personal-information/useOptimisticPersonalInformations";
import { type TAddOptimistic } from "@/app/(app)/personal-information/useOptimisticPersonalInformation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";


import { getUserAuth } from "@/lib/auth/utils";

import { type PersonalInformation, newInsertPersonalInformationParams } from "@/lib/db/schema/personalInformation";
import {
  createPersonalInformationAction,
  deletePersonalInformationAction,
  updatePersonalInformationAction,
} from "@/lib/actions/personalInformation";


const PersonalInformationForm = ({

  personalInformation,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  personalInformation?: PersonalInformation | null;

  openModal?: (personalInformation?: PersonalInformation) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<PersonalInformation>(newInsertPersonalInformationParams);
  const editing = !!personalInformation?.id;

  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("personal-information");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: PersonalInformation },
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
      toast.success(`PersonalInformation ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };


  const handleSubmit = async (data: FormData) => {
    let payload: Record<string, any> = {};

    data.forEach((value, key) => {
      if (key === 'salary') {
        payload[key] = Number(value);
      } else {
        payload[key] = value;
      }
    });

    const personalInformationParsed = await newInsertPersonalInformationParams.safeParseAsync({ ...payload });
    if (!personalInformationParsed.success) {
      setErrors(personalInformationParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();

    const values = personalInformationParsed.data;

    const pendingPersonalInformation: PersonalInformation = {
      updatedAt: personalInformation?.updatedAt ?? new Date(),
      createdAt: personalInformation?.createdAt ?? new Date(),
      id: personalInformation?.id ?? "",
      userId: personalInformation?.userId ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingPersonalInformation,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updatePersonalInformationAction({ ...values, id: personalInformation.id })
          : await createPersonalInformationAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingPersonalInformation
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };
  return (
    <form action={handleSubmit} onChange={handleChange} className={"bg-muted p-6  rounded-lg"}>
      {/* Schema fields start */}
      <div className="grid grid-cols-2 gap-4">
        {/* Name Input */}
        <div>
          <Input
            type="text"
            name="name"
            placeholder="Nombre"
            className={cn(errors?.name ? "ring ring-destructive" : "")}
            defaultValue={personalInformation?.name ?? ""}
          />
          {errors?.name ? (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.name}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Input
            type="text"
            name="ci"
            placeholder="Cédula"
            className={cn(errors?.ci ? "ring ring-destructive" : "")}
            defaultValue={personalInformation?.ci ?? ""}
          />
          {errors?.ci ? (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.ci}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="phone"
            placeholder="Teléfono"
            className={cn(errors?.phone ? "ring ring-destructive" : "")}
            defaultValue={personalInformation?.phone ?? ""}
          />
          {errors?.phone ? (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.phone}</p>
          ) : (
            <div className="h-6" />
          )}
        </div>
        <div>
          <Input
            type="number"
            name="salary"
            placeholder="Salario"
            className={cn(errors?.salary ? "ring ring-destructive" : "")}
            defaultValue={personalInformation?.salary ?? ""}
          />
          {errors?.salary ? (
            <p className="text-xs text-destructive text-red-500 mt-2">{errors.salary}</p>

          ) : (
            <div className="h-6" />
          )}

        </div>
      </div>
      <div className="">
        <Input
          type="text"
          name="address"
          placeholder="Dirección"
          className={cn(errors?.address ? "ring ring-destructive" : "")}
          defaultValue={personalInformation?.address ?? ""}
        />
        {errors?.address ? (
          <p className="text-xs text-destructive text-red-500 mt-2 mb-2">{errors.address}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

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
              addOptimistic && addOptimistic({ action: "delete", data: personalInformation });
              const error = await deletePersonalInformationAction(personalInformation.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: personalInformation,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default PersonalInformationForm;

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
      className="mr-2"
      variant={"teal3"}
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Agregar Registr${isCreating ? "ing..." : "o"}`}
    </Button>
  );
};
