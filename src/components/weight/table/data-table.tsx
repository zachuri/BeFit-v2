"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useSessionContext } from "@supabase/auth-helpers-react"
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedRowsData, setSelectedRowsData] = React.useState<RowData[]>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: (selectedRowIds) => {
      setRowSelection(selectedRowIds), handleSelectedRows()
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
      sorting,
    },
  })

  // Function to handle storing selected row data
  const handleSelectedRows = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedData: RowData[] = []

    selectedRows.forEach((row) => {
      const rowData = row.original
      selectedData.push(rowData)
    })

    setSelectedRowsData(selectedData)
  }

  React.useEffect(() => {
    handleSelectedRows()
  }, [rowSelection])

  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  // Function to handle deleting selected rows
  const handleDeleteSelectedRows = async () => {
    const deletePromises = selectedRowsData.map((rowData) =>
      supabaseClient
        .from("weight")
        .delete()
        // @ts-ignore
        .eq("id", rowData.id)
        .single()
    )

    const results = await Promise.all(deletePromises)

    // Check if any errors occurred during deletion
    const hasErrors = results.some((result) => result.error)
    if (hasErrors) {
      toast({
        title: "Something went wrong.",
        description: "No update was made.",
        variant: "destructive",
      })
      return
    }

    toast({
      description: "Your changes have been updated.",
    })

    // Refresh the data or perform any other necessary action
    router.refresh()
  }

  return (
    <div className="space-y-4">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        handleDeleteSelectedRows={handleDeleteSelectedRows}
      />
    </div>
  )
}
