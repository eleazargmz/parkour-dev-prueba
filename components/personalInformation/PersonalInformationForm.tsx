import { z } from "zod";

import { useEffect, useState, useTransition } from "react";
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

import { type PersonalInformation, insertPersonalInformationParams } from "@/lib/db/schema/personalInformation";
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
    useValidatedForm<PersonalInformation>(insertPersonalInformationParams);
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
    setErrors(null);
    // const { session } = await getUserAuth();
    // console.log("session ====>", session)
    const dataPayload = Object.fromEntries(data.entries());
    const payload = Object.fromEntries(data.entries());
  

    const personalInformationParsed = await insertPersonalInformationParams.safeParseAsync({ ...payload });
    if (!personalInformationParsed.success) {
      setErrors(personalInformationParsed?.error.flatten().fieldErrors);
      return;
    }
    console.log("personalInformationParsed= ===>", personalInformationParsed)
    // const idPf = uuidv4();

    closeModal && closeModal();

    // const newId = uuidv4();
    // const payload = {
    //   id: newId,
    //   name: dataPayload.name,
    //   ci: dataPayload.ci,
    //   phone: dataPayload.phone,
    //   address: dataPayload.address,
    //   salary: dataPayload.salary,
    // }
    const values = personalInformationParsed.data;
    console.log("Valor de informacion persona - Crear ===>", values)
    
    const pendingPersonalInformation: PersonalInformation = {
      updatedAt: personalInformation?.updatedAt ?? new Date(),
      createdAt: personalInformation?.createdAt ?? new Date(),
      id: personalInformation?.id ?? "",
      userId: personalInformation?.userId ?? "",
      ...values,
    };
    // console.log("pendingPersonalInformation =>", pendingPersonalInformation)
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingPersonalInformation,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updatePersonalInformationAction({ ...values, id: personalInformation.id })
          : await createPersonalInformationAction(values);
        console.log("Error ======>", error);

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
    <form action={handleSubmit} onChange={handleChange} className={"bg-gray-200 p-3"}>
      {/* Schema fields start */}
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.name ? "text-destructive" : "",
          )}
        >
          Name
        </Label>
        <Input
          type="text"
          name="name"
          className={cn(errors?.name ? "ring ring-destructive" : "")}
          defaultValue={personalInformation?.name ?? ""}
        />
        {errors?.name ? (
          <p className="text-xs text-destructive mt-2">{errors.name[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.ci ? "text-destructive" : "",
          )}
        >
          Ci
        </Label>
        <Input
          type="text"
          name="ci"
          className={cn(errors?.ci ? "ring ring-destructive" : "")}
          defaultValue={personalInformation?.ci ?? ""}
        />
        {errors?.ci ? (
          <p className="text-xs text-destructive mt-2">{errors.ci[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.phone ? "text-destructive" : "",
          )}
        >
          Phone
        </Label>
        <Input
          type="text"
          name="phone"
          className={cn(errors?.phone ? "ring ring-destructive" : "")}
          defaultValue={personalInformation?.phone ?? ""}
        />
        {errors?.phone ? (
          <p className="text-xs text-destructive mt-2">{errors.phone[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.address ? "text-destructive" : "",
          )}
        >
          Address
        </Label>
        <Input
          type="text"
          name="address"
          className={cn(errors?.address ? "ring ring-destructive" : "")}
          defaultValue={personalInformation?.address ?? ""}
        />
        {errors?.address ? (
          <p className="text-xs text-destructive mt-2">{errors.address[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.salary ? "text-destructive" : "",
          )}
        >
          Salary
        </Label>
        <Input
          type="text"
          name="salary"
          className={cn(errors?.salary ? "ring ring-destructive" : "")}
          defaultValue={personalInformation?.salary ?? ""}
        />
        {errors?.salary ? (
          <p className="text-xs text-destructive mt-2">{errors.salary[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

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
      variant={"teal"}
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Agregar Registr${isCreating ? "ing..." : "o"}`}
    </Button>
  );
};
