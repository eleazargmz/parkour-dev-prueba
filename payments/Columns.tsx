// import { v4 as uuidV4 } from "uuid";
// import { uniqueNamesGenerator, Config, names } from "unique-names-generator";

// const config: Config = {
//   dictionaries: [names],
// };

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
//   clientName: string;
// };

// const randomStatus = () => {
//   const statuses = ["pending", "processing", "success", "failed"] as const;
//   return statuses[Math.floor(Math.random() * statuses.length)];
// };

// const randomEmail = (clientName: string) => {
//   const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
//   const randomDomain = domains[Math.floor(Math.random() * domains.length)];
//   return `${clientName}@${randomDomain}`;
// };

// export const payments: Payment[] = Array.from({ length: 500 }, (_) => {
//   const randomName = uniqueNamesGenerator(config);

//   return {
//     id: uuidV4(),
//     amount: Math.floor(Math.random() * 10000) / 100,
//     status: randomStatus(),
//     clientName: randomName,
//     email: randomEmail(randomName.toLowerCase()),
//   };
// });


"use client"

import { ColumnDef } from "@tanstack/react-table"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
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
        Cedula
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
    header: "Direccion",
  },
  {
    accessorKey: "phone",
    header: "Telefono",
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

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original
 
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]