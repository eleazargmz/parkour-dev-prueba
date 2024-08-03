"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/personal-information/useOptimisticPersonalInformation";
import { type PersonalInformation } from "@/lib/db/schema/personalInformation";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import PersonalInformationForm from "@/components/personalInformation/PersonalInformationForm";


export default function OptimisticPersonalInformation({ 
  personalInformation,
   
}: { 
  personalInformation: PersonalInformation; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: PersonalInformation) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticPersonalInformation, setOptimisticPersonalInformation] = useOptimistic(personalInformation);
  const updatePersonalInformation: TAddOptimistic = (input) =>
    setOptimisticPersonalInformation({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <PersonalInformationForm
          personalInformation={optimisticPersonalInformation}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updatePersonalInformation}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticPersonalInformation.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticPersonalInformation.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticPersonalInformation, null, 2)}
      </pre>
    </div>
  );
}
