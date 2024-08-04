"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type PersonalInformation, CompletePersonalInformation } from "@/lib/db/schema/personalInformation";
import Modal from "@/components/shared/Modal";

import { useOptimisticPersonalInformations } from "@/app/(app)/personal-information/useOptimisticPersonalInformation";
import { Button } from "@/components/ui/button";
import PersonalInformationForm from "./PersonalInformationForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (personalInformation?: PersonalInformation) => void;

export default function PersonalInformationList({
  personalInformation,
   
}: {
  personalInformation: CompletePersonalInformation[];
   
}) {
  const { optimisticPersonalInformations, addOptimisticPersonalInformation } = useOptimisticPersonalInformations(
    personalInformation,
     
  );
  const [open, setOpen] = useState(false);
  const [activePersonalInformation, setActivePersonalInformation] = useState<PersonalInformation | null>(null);
  const openModal = (personalInformation?: PersonalInformation) => {
    setOpen(true);
    personalInformation ? setActivePersonalInformation(personalInformation) : setActivePersonalInformation(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activePersonalInformation ? "Edit PersonalInformation" : "Create Personal Information"}
      >
        <PersonalInformationForm
          personalInformation={activePersonalInformation}
          addOptimistic={addOptimisticPersonalInformation}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticPersonalInformations.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticPersonalInformations.map((personalInformation) => (
            <PersonalInformation
              personalInformation={personalInformation}
              key={personalInformation.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const PersonalInformation = ({
  personalInformation,
  openModal,
}: {
  personalInformation: CompletePersonalInformation;
  openModal: TOpenModal;
}) => {
  const optimistic = personalInformation.id === "optimistic";
  const deleting = personalInformation.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("personal-information")
    ? pathname
    : pathname + "/personal-information/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{personalInformation.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + personalInformation.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No personal information
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new personal information.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Personal Information </Button>
      </div>
    </div>
  );
};
