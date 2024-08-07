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
import { DataTable } from "@/payments/data-table";
import { columns, Payment } from "@/payments/Columns";

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
        <Button onClick={() => openModal()} variant={"teal"}>
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

  // const optimistic = personalInformation.id === "optimistic";
  // const deleting = personalInformation.id === "delete";
  // const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("personal-information")
    ? pathname
    : pathname + "/personal-information/";

  const payments: Payment[] = [
    {
      id: "1",
      name: "Juan Perez",
      ci: "229912345",
      phone: "04128373347",
      address: "Calle Falsa 123",
      salary: 55000,
      userId: "1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Maria Gonzalez",
      ci: "229923456",
      phone: "04127654321",
      address: "Avenida Siempreviva 456",
      salary: 60000,
      userId: "2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Carlos Martinez",
      ci: "229934567",
      phone: "04126543218",
      address: "Calle Principal 789",
      salary: 65000,
      userId: "3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Ana Rodriguez",
      ci: "229945678",
      phone: "04125432167",
      address: "Avenida Central 101",
      salary: 70000,
      userId: "4",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      name: "Luis Fernandez",
      ci: "229956789",
      phone: "04124321056",
      address: "Calle Secundaria 202",
      salary: 75000,
      userId: "5",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      name: "Laura Hernandez",
      ci: "229967890",
      phone: "04123210945",
      address: "Avenida Secundaria 303",
      salary: 80000,
      userId: "6",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "7",
      name: "Jose Lopez",
      ci: "229978901",
      phone: "04122109834",
      address: "Calle Tercera 404",
      salary: 85000,
      userId: "7",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "8",
      name: "Elena Ramirez",
      ci: "229989012",
      phone: "04121098723",
      address: "Avenida Tercera 505",
      salary: 90000,
      userId: "8",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "9",
      name: "Miguel Garcia",
      ci: "229990123",
      phone: "04120987612",
      address: "Calle Cuarta 606",
      salary: 95000,
      userId: "9",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "10",
      name: "Isabel Sanchez",
      ci: "229901234",
      phone: "04129876501",
      address: "Avenida Cuarta 707",
      salary: 100000,
      userId: "10",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "11",
      name: "Antonio Moreno",
      ci: "229912345",
      phone: "04128765432",
      address: "Calle Quinta 808",
      salary: 105000,
      userId: "11",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "12",
      name: "Rosa Torres",
      ci: "229923456",
      phone: "04127654321",
      address: "Avenida Quinta 909",
      salary: 110000,
      userId: "12",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "13",
      name: "Daniel Ruiz",
      ci: "229934567",
      phone: "04126543210",
      address: "Calle Sexta 1010",
      salary: 115000,
      userId: "13",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "14",
      name: "Patricia Diaz",
      ci: "229945678",
      phone: "04125432109",
      address: "Avenida Sexta 1111",
      salary: 120000,
      userId: "14",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "15",
      name: "Javier Gomez",
      ci: "229956789",
      phone: "04124321098",
      address: "Calle Septima 1212",
      salary: 125000,
      userId: "15",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    // ...
  ]

  const newPersonalInformation = personalInformation.map((information) => ({
    ...information,
    ci: String(information.ci),
    phone: String(information.phone)
  }))


  return (
    <>
      <div className="w-full mt-5 p-4 bg-gray-50 rounded-xl">
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
