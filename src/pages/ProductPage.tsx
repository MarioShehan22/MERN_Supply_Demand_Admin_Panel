import * as React from "react"
import {CaretSortIcon, ChevronDownIcon, } from "@radix-ui/react-icons"
import {ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useState} from "react";
import ProductCreate from "@/components/ProductCreate";
import ProductUpdate from "@/components/ProductUpdate";
import {useGetProduct} from "@/api/ProductService";
import AxiosInstance from "@/config/AxiosInstance";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";

export type Product = {
    ProductName:string|''
    description:string|''
    showPrice: number|0
    purchasePrice:number|0
    QuantityInKilos:number|0
    imageUrl:string|''
    "activeState": boolean|undefined,
}

export const columns: ColumnDef<Product>[] = [
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
        accessorKey: "ProductName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ProductName
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("ProductName")}</div>,
    },
    {
        accessorKey: "showPrice",
        header: () => <div className="text-right">showPrice</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("showPrice"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "LKR",
            }).format(amount);
            return  <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "purchasePrice",
        header: () => <div className="text-right">purchasePrice</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("purchasePrice"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "LKR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "description",
        header: () => <div className="text-right">Description</div>,
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
        ),
    },
]

const ProductPage = () =>  {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    const [modalShow, setModalShow] = useState<boolean>(false);
    const[selectedProduct,setSelectedProduct] = useState({});

    const {data,error} =  useGetProduct();
    const { toast } = useToast();
    if(error){
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error Getting Products. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
    }
    const table = useReactTable<Product>({
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
            <ProductCreate/>
            <div className="flex items-center py-3">
                <Input
                    placeholder="Filter Product..."
                    value={(table.getColumn("ProductName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("ProductName")?.setFilterValue(event.target.value)}
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
                                                        setSelectedProduct(row.original);
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
                                                if(confirm(`are you sure Delete this product?${row.original._id}`)){
                                                    AxiosInstance.delete("/products/delete/" + row.original._id).then(r=>{
                                                        toast({
                                                            description: "Successful Delete Products!",
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
            {modalShow && <ProductUpdate
                data={selectedProduct}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />}
        </div>
    )
}
export default ProductPage;
//console.log(row.original)
//`http://localhost:3000/api/v1/products/find-all/${row.imageUrl}`
//require(`./src/assets/1720639048787-Fish.jpg`).default
