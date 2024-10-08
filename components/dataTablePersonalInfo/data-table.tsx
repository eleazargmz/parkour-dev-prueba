"use client"

import { useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const placeholders: Record<string, string> = {
  ci: "cédula",
  name: "nombre",
  address: "dirección",
  phone: "teléfono",
};


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [currentStatus, setCurrentStatus] = useState("ci")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleSelectChange = (value: string) => {
    if (table.getColumn(currentStatus)) {
      table.getColumn(currentStatus)?.setFilterValue('');
    }
    setCurrentStatus(value);
  };

  const placeholderText = placeholders[currentStatus] ?? "Buscar...";

  return (
    <div>
      <div className="flex items-center justify-center py-4">
        <Input
          placeholder={`Filtrar ${placeholderText}...`}
          value={(table.getColumn(currentStatus)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(currentStatus)?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-muted-foreground-ip"
          disabled={!currentStatus}
        />
        <Select
          value={currentStatus}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger className="w-[180px] bg-card-foreground border-card-foreground rounded text-white font-bold">
            <SelectValue placeholder={`Buscar por ${currentStatus}...`} />
          </SelectTrigger>
          <SelectContent className="w-[180px] text-muted-foreground-ip">
            <SelectGroup>
              <SelectItem value="ci">Cédula</SelectItem>
              <SelectItem value="name">Nombre</SelectItem>
              <SelectItem value="address">Dirección</SelectItem>
              <SelectItem value="phone">Teléfono</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center space-x-2 py-4 mx-2">
          <Button
            variant="teal2"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="teal2"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
