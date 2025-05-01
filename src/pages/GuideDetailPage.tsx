import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState} from "@tanstack/react-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, ChevronDownIcon} from "@radix-ui/react-icons";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {UseGetGuides} from "@/api/GuideService";
import AxiosInstance from "@/config/AxiosInstance";
import {useToast} from "../components/ui/use-toast";
import {ToastAction} from "../components/ui/toast";
import {Guide} from "@/lib/types.ts";


export const columns: ColumnDef<Guide>[] = [
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
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    First Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
    },
    {
        accessorKey: "expertise",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expertise
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div>
                {row.getValue("expertise") && (row.getValue("expertise") as string[]).length > 0 ? (
                    <div className="space-y-1">
                        {(row.getValue("expertise") as string[]).map((item, index) => (
                            <span key={index} className="inline-block bg-gray-100 px-2 py-1 rounded mr-1 mb-1">
                                {item}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No expertise listed</p>
                )}
            </div>
        ),
    },
    {
        accessorKey: "languages",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Languages
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div>
                {row.getValue("languages") && (row.getValue("languages") as string[]).length > 0 ? (
                    <div className="space-y-1">
                        {(row.getValue("languages") as string[]).map((item, index) => (
                            <span key={index} className="inline-block bg-blue-100 px-2 py-1 rounded mr-1 mb-1">
                                {item}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No languages listed</p>
                )}
            </div>
        ),
    },
    {
        accessorKey: "phoneNumber",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Phone Number
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
        accessorKey: "is_active",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    row.getValue("is_active") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                    {row.getValue("is_active") ? "Active" : "Inactive"}
                </span>
            </div>
        ),
    },
]

const GuideDetailPage = () => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({});
    const {data, refetch, error} = UseGetGuides();
    const { toast } = useToast();

    if(error){
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Error loading guides. Please try again.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
    }

    const table = useReactTable<Guide>({
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

    const handleToggleStatus = async (guideId: string, currentStatus: boolean) => {
        try {
            await AxiosInstance.patch(`/guides/${guideId}`, {
                is_active: !currentStatus
            });
            refetch();
            toast({
                description: `Guide status updated successfully.`,
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to update status",
                description: "An error occurred while updating the guide status.",
            });
        }
    };

    const handleDeleteGuide = async (guideId: string) => {
        if(confirm('Are you sure you want to delete this guide?')) {
            try {
                await AxiosInstance.delete(`/guides/${guideId}`);
                refetch();
                toast({
                    description: "Guide deleted successfully.",
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Failed to delete",
                    description: "An error occurred while deleting the guide.",
                });
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex items-center py-3">
                <Input
                    placeholder="Filter guides by name..."
                    value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
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
                                <TableHead className="text-center">Actions</TableHead>
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
                                    <TableCell className="flex justify-center space-x-2">
                                        <Button
                                            className="py-2 w-[100px] rounded-md bg-blue-500 hover:bg-blue-700 text-white duration-300"
                                            onClick={() => {
                                                // Handle view details or edit
                                                // You would typically navigate to a detail page
                                                console.log("Edit guide:", row.original);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            className={`py-2 w-[100px] rounded-md text-white duration-300 ${
                                                row.original.is_active
                                                    ? "bg-amber-500 hover:bg-amber-700"
                                                    : "bg-green-500 hover:bg-green-700"
                                            }`}
                                            onClick={() => handleToggleStatus(row.original._id, row.original.is_active)}
                                        >
                                            {row.original.is_active ? "Deactivate" : "Activate"}
                                        </Button>
                                        <Button
                                            className="py-2 w-[100px] rounded-md bg-red-500 hover:bg-red-700 text-white duration-300"
                                            onClick={() => handleDeleteGuide(row.original._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + 1}
                                    className="h-24 text-center"
                                >
                                    No guides found.
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

export default GuideDetailPage;