import {CaretSortIcon, ChevronDownIcon, } from "@radix-ui/react-icons"
import {ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useState} from "react";
import {useGetTour} from "@/api/TourService.ts";
import AxiosInstance from "@/config/AxiosInstance";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import TourForm from "@/components/TourForm.tsx";

export type Tour = {
    _id: string|'';
    title:string|''
    description:string|''
    startDate: Date|''
    endDate: Date|''
    duration:number|0
    price:number|0
    maxParticipants:number|0
    currentParticipants:number|0
    image:string|''
    guideId:string|''
    status:string|''
    cancellationPolicy:string|''
    createdAt:string|''
    // "activeState": boolean|undefined,
}

export const columns: ColumnDef<Tour>[] = [
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
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    title
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    description
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
    },
    {
        accessorKey: "startDate",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    startDate
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">
            {new Date(row.getValue("startDate")).toLocaleDateString()}
        </div>,
    },
    {
        accessorKey: "endDate",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    endDate
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">
            {new Date(row.getValue("endDate")).toLocaleDateString()}
        </div>,
    },
    {
        accessorKey: "duration",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    duration
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("duration")}</div>,
    },
    {
        accessorKey: "price",
        header: () => <div className="text-right">price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return  <div className="text-right font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "maxParticipants",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    maxParticipants
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("maxParticipants")}</div>,
    },
    {
        accessorKey: "currentParticipants",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    currentParticipants
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("currentParticipants")}</div>,
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    createdAt
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => <div className="lowercase">{row.getValue("createdAt")}</div>,
    },
]

const TourPage = () =>  {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    //const [modalShow, setModalShow] = useState<boolean>(false);
    //const[selectedProduct,setSelectedProduct] = useState({});

    const {data,error} =  useGetTour();
    const { toast } = useToast();
    if(error){
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error Getting Products. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
    }
    const table = useReactTable<Tour>({
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
            <TourForm/>
            <div className="flex items-center py-3">
                <Input
                    placeholder="Filter Tour..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
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
                                                // onClick={
                                                //     () => {
                                                //         setSelectedProduct(row.original);
                                                //         setModalShow(true);
                                                //     }}
                                        >
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            className="py-2 w-[100px] rounded-md bg-red-400 text-black hover:bg-red-600 text-white duration-300 bg-none"
                                            onClick={()=>{
                                                if(confirm(`are you sure Delete this product?${row.original?._id}`)){
                                                    AxiosInstance.delete("/products/delete/" + row.original?._id).then(()=>{
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
            {/*{modalShow && <ProductUpdate*/}
            {/*    data={selectedProduct}*/}
            {/*    show={modalShow}*/}
            {/*    onHide={() => setModalShow(false)}*/}
            {/*/>}*/}
        </div>
    )
}
export default TourPage;
//console.log(row.original)
//`http://localhost:3000/api/v1/products/find-all/${row.imageUrl}`
//require(`./src/assets/1720639048787-Fish.jpg`).default
