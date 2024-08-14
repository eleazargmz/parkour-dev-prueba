"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define el tipo de datos que usas
export type Payment = {
  id: string;
  name: string;
  ci: string;
  phone: string;
  address: string;
  salary: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "ci",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Cédula
        <ArrowUpDown className="ml-2 h-4 w-6" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-6" />
      </Button>
    ),
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salario
        <ArrowUpDown className="ml-2 h-4 w-6" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>("salary"); // Directamente como número
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
 
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
]