import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import * as React from "react";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {UseGetOrder} from "@/api/OrderService";
import AxiosInstance from "@/config/AxiosInstance";
import {useToast} from "../components/ui/use-toast";
import {ToastAction} from "../components/ui/toast";

export type Order = {
    cartItem:[];
    customerDetail:{ // Define the structure of customerDetail object
        _id: string;
        email: string;
        fistName: string; // Assuming a typo, should be "firstName"
        lastName: string;
        phoneNumber: string;
        businessName: string;
        role: string;
        password: string; // Consider not including password in rendered data
        activeState: boolean;
        __v: number;
        tokenVersion: number;
    };
    totalPrice: number|null;
    activeState: boolean|undefined;
    date:Date|'';
}

export const columns: ColumnDef<Order>[] = [
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
        accessorKey: "cartItem",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CartItem
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) =>
            <div className="lowercase">
                {row.getValue('cartItem')?.length  > 0 ?(
                    row.getValue("cartItem").map((item, index) => (
                        <ul key={index}>
                            <li>
                                {item.quantity} : {item.name}
                            </li>
                        </ul>
                    ))
                ) : (
                    <p>No items in cart</p>
                )}
            </div>,
    },
    {
        accessorKey: "customerDetail",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    customerDetail
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="lowercase">
                {row.getValue("customerDetail")?.email} {/* Access email property */}
            </div>
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) =>
            <div className="lowercase">
                {new Date(row.getValue("date")).toLocaleDateString()}
            </div>,
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Price
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("totalPrice")}</div>,
    },
]//ColumnDef in Order Table

const OrderDetailPage  = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    const {data,refetch,error} = UseGetOrder();
    const { toast } = useToast();
    if(error){
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error Getting Orders. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
    }
    const table = useReactTable<Order>({
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

    return (
        <div className="w-full">
            <div className="flex items-center py-3">
                <Input
                    placeholder="Filter orders..."
                    value={(table.getColumn("customerDetail")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("customerDetail")?.setFilterValue(event.target.value)}
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
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                            }
                                        </TableCell>
                                    ))}
                                    <TableCell className="text-center">
                                        <Button
                                            className="py-2 w-[100px] rounded-md bg-green-500 text-black hover:bg-green-700 text-white duration-300 bg-none"
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            className="py-2 w-[100px] rounded-md bg-red-400 text-black hover:bg-red-600 text-white duration-300 bg-none"
                                            onClick={()=>{
                                                if(confirm('are you sure Delete this Order?')){
                                                    AxiosInstance.delete("/orders/delete/" + row.original._id).then(
                                                        refetch
                                                    ).then(r=>{
                                                        toast({
                                                            description: "Order Delete successfully.",
                                                        });
                                                    });
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
        </div>
    )
}
export default OrderDetailPage;
