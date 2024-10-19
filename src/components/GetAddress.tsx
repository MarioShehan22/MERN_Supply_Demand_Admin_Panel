import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable,VisibilityState} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {Address} from "@/pages/AddressPage";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useGetAddress} from "@/api/AddressService";
import axios from "axios";
import AddressUpdate from "@/components/AddressUpdate";
import AxiosInstance from "@/config/AxiosInstance";

export const columns: ColumnDef<Address>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "addressLine",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Address Line
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("addressLine")}</div>,
    },
    {
        accessorKey: "district",
        header: () => <div className="text-center">district</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("district")}</div>
        ),
    },
    {
        accessorKey: "city",
        header: () => <div className="text-center">city</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("city")}</div>
        ),
    },
    {
        accessorKey: "user",
        header: () => <div className="text-center">user</div>,
        cell: ({ row }) => (
            <div>{row.getValue("user")}</div>

        ),
    },
    {
        accessorKey: "optional",
        header: () => <div className="text-center">optional</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("optional")}</div>
        ),
    },
]

const GetAddress = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    const [modalShow, setModalShow] = useState<boolean>(false);
    const[selectedAddres,setSelectedAddres] = useState({});
    const {data} = useGetAddress();
    const table = useReactTable<Address>({
        data,
        columns,
        "onSortingChange": setSorting,
        "onColumnFiltersChange": setColumnFilters,
        "getCoreRowModel": getCoreRowModel(),
        "getPaginationRowModel": getPaginationRowModel(),
        "getSortedRowModel": getSortedRowModel(),
        "getFilteredRowModel": getFilteredRowModel(),
        "onColumnVisibilityChange": setColumnVisibility,
        "onRowSelectionChange": setRowSelection,
        "state": {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
  return(
      <div className="w-full">
          <div className="flex items-center py-3">
              <Input
                  placeholder="Filter Address..."
                  value={(table.getColumn("addressLine")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("addressLine")?.setFilterValue(event.target.value)}
                  className="max-w-sm"
              />
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="ml-auto">
                          Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                      {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => {
                              return (
                                  <DropdownMenuCheckboxItem
                                      key={column.id}
                                      className="capitalize"
                                      checked={column.getIsVisible()}
                                      onCheckedChange={(value) =>
                                          column.toggleVisibility(!!value)
                                      }
                                  >
                                      {column.id}
                                  </DropdownMenuCheckboxItem>
                              )
                          })}
                  </DropdownMenuContent>
              </DropdownMenu>
          </div>
          <div className="rounded-md border">
              <Table>
                  <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}
                                    className="text-center"
                          >
                              {headerGroup.headers.map((header) => {
                                  return (
                                      <TableHead key={header.id}
                                                 className="text-center"
                                      >
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                      </TableHead>
                                  )
                              })}
                              <TableHead className="text-center">Update</TableHead>
                              <TableHead className="text-center">Delete</TableHead>
                          </TableRow>
                      ))}
                  </TableHeader>
                  <TableBody>
                      {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                              <TableRow
                                  key={row.id}
                                  data-state={row.getIsSelected() && "selected"}
                                  className="text-center"
                              >
                                  {row.getVisibleCells().map((cell) => (
                                      <TableCell key={cell.id}
                                                 className="text-center"
                                      >
                                          {flexRender(
                                              cell.column.columnDef.cell,
                                              cell.getContext()
                                          )}
                                      </TableCell>
                                  ))}
                                  <TableCell className="text-center">
                                      <Button
                                          className="py-2 w-[100px] rounded-md bg-green-500 text-black hover:bg-green-700 text-white duration-300 bg-none"
                                              onClick={
                                                  () => {
                                                      setSelectedAddres(row.original);
                                                      setModalShow(true);
                                                  }}
                                      >
                                          Update
                                      </Button>
                                  </TableCell>
                                  <TableCell className="text-center">
                                      <Button
                                          className="py-2 w-[100px] rounded-md bg-red-400 text-black hover:bg-red-600 text-white duration-300 bg-none"
                                          onClick={()=>{
                                              if(confirm('are you sure?')){
                                                  AxiosInstance.delete("/address/delete/" + row.original._id);
                                              }
                                          }}
                                      >
                                          Delete
                                      </Button>
                                  </TableCell>
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
          <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                  >
                      Previous
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                  >
                      Next
                  </Button>
              </div>
          </div>
          {modalShow && <AddressUpdate
              data={selectedAddres}
              show={modalShow}
              onHide={() => setModalShow(false)}
          />}
      </div>
  );
}
export default GetAddress;
