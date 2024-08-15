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
import { DataTable } from "@/components/dataTablePersonalInfo/data-table";
import { columns, Payment } from "@/components/dataTablePersonalInfo/Columns";

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
        title={activePersonalInformation ? "Edit PersonalInformation" : "Crear información personal"}
      >
        <PersonalInformationForm
          personalInformation={activePersonalInformation}
          addOptimistic={addOptimisticPersonalInformation}
          openModal={openModal}
        // closeModal={closeModal}

        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"teal3"}>
          Agregar Información
        </Button>
      </div>
      {optimisticPersonalInformations.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {/* {optimisticPersonalInformations.map((personalInformation) => ( */}
          <PersonalInformation
            personalInformation={optimisticPersonalInformations}
            // key={personalInformation.id}
            openModal={openModal}
          />
          {/* ))} */}
        </ul>
      )}
    </div>
  );
}

const PersonalInformation = ({
  personalInformation,
  openModal,
}: {
  personalInformation: CompletePersonalInformation[];
  openModal: TOpenModal;
}) => {
  const pathname = usePathname();
  const basePath = pathname.includes("personal-information")
    ? pathname
    : pathname + "/personal-information/";

  const newPersonalInformation = personalInformation.map((information) => ({
    ...information,
    ci: String(information.ci),
    phone: String(information.phone)
  }))


  return (
    <>
      <div className="w-full mt-5 p-4 bg-muted-foreground rounded-xl">
        <div className="w-full rounded-xl">
          <DataTable columns={columns} data={newPersonalInformation} />
        </div>
      </div>
    </>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No hay información personal
      </h3>
      <p className="mt-1 text-sm text-secondary-foreground">
        Comienza creando una nueva información personal.
      </p>
      <div className="mt-6">
        {/* <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> Nueva Información Personal
        </Button> */}
      </div>
    </div>
  );
};
