import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AxiosInstance from "@/config/AxiosInstance";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";
import { UseGetBooking } from "@/api/BookingService.ts";
import { Booking } from "@/lib/types";

export const columns: ColumnDef<Booking>[] = [
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
        accessorKey: "_id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                ID
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm font-medium">
                {row.index + 1}
            </div>
        ),
    },
    // {
    //     accessorKey: "tourId",
    //     header: ({ column }) => (
    //         <Button
    //             variant="ghost"
    //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //             Tour ID
    //             <CaretSortIcon className="ml-2 h-4 w-4" />
    //         </Button>
    //     ),
    //     cell: ({ row }) => (
    //         <div className="text-sm">
    //             {row.getValue("tourId")}
    //         </div>
    //     ),
    // },
    // {
    //     accessorKey: "touristId",
    //     header: ({ column }) => (
    //         <Button
    //             variant="ghost"
    //             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //             Tourist ID
    //             <CaretSortIcon className="ml-2 h-4 w-4" />
    //         </Button>
    //     ),
    //     cell: ({ row }) => (
    //         <div className="text-sm">
    //             {row.getValue("touristId")}
    //         </div>
    //     ),
    // },
    {
        accessorKey: "participantCount",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Participants
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm text-center">
                {row.getValue("participantCount")}
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                }`}>
                    {status}
                </div>
            );
        },
    },
    {
        accessorKey: "bookingDate",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Booking Date
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm">
                {new Date(row.getValue("bookingDate")).toLocaleDateString()}
            </div>
        ),
    },
    {
        accessorKey: "paymentStatus",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Payment
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const paymentStatus = row.getValue("paymentStatus") as string;
            return (
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            paymentStatus === 'refunded' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                }`}>
                    {paymentStatus}
                </div>
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Price
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="text-sm font-medium">
                ${(row.getValue("totalPrice") as number)?.toFixed(2)}
            </div>
        ),
    },
    {
        accessorKey: "specialRequests",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Special Requests
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            const requests = row.getValue("specialRequests") as string;
            return requests ? (
                <div className="text-sm max-w-xs truncate" title={requests}>
                    {requests}
                </div>
            ) : (
                <div className="text-sm text-gray-400">None</div>
            );
        },
    },
];

const BookingDetails = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [filterField, setFilterField] = useState<string>("tourId");
    const [filterValue, setFilterValue] = useState<string>("");
    //const [isUpdating, setIsUpdating] = useState<boolean>(false);
    //const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const { data, isFetching, refetch, error } = UseGetBooking();
    const { toast } = useToast();

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Failed to load bookings",
                description: "There was an error retrieving booking data. Please try again.",
                action: <ToastAction altText="Try again" onClick={() => refetch()}>Retry</ToastAction>,
            });
        }
    }, [error, toast, refetch]);

    useEffect(() => {
        if (filterField && filterValue) {
            table.getColumn(filterField)?.setFilterValue(filterValue);
        }
    }, [filterField, filterValue]);

    const handleUpdate = (booking: Booking) => {
        //setSelectedBooking(booking);
        //setIsUpdating(true);
        // In a real app, you'd open a modal or navigate to an edit form
        toast({
            title: "Update Booking",
            description: `Preparing to update booking ${booking._id}`,
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            try {
                await AxiosInstance.delete(`/bookings/delete/${id}`);
                await refetch();
                toast({
                    title: "Success",
                    description: "Booking deleted successfully",
                });
            } catch (err) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete booking. Please try again.",
                });
            }
        }
    };

    const table = useReactTable<Booking>({
        data: data || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    // Set a reasonable page size
    useEffect(() => {
        table.setPageSize(10);
    }, []);

    const filterableFields = [
        { value: "tourId", label: "Tour ID" },
        { value: "touristId", label: "Tourist ID" },
        { value: "status", label: "Status" },
        { value: "paymentStatus", label: "Payment Status" },
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Booking Management</h2>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => refetch()}
                >
                    Refresh
                </Button>
            </div>

            <div className="w-full">
                {/* Filters and controls */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex flex-1 gap-2 min-w-[100px]">
                        <select
                            className="px-2 py-2 border rounded-md text-sm"
                            value={filterField}
                            onChange={(e) => {
                                setFilterField(e.target.value);
                                setFilterValue("");
                                table.getColumn(e.target.value)?.setFilterValue("");
                            }}
                        >
                            {filterableFields.map(field => (
                                <option key={field.value} value={field.value}>
                                    {field.label}
                                </option>
                            ))}
                        </select>
                        <Input
                            placeholder={`Filter by ${filterableFields.find(f => f.value === filterField)?.label}...`}
                            value={filterValue}
                            onChange={(e) => {
                                setFilterValue(e.target.value);
                                table.getColumn(filterField)?.setFilterValue(e.target.value);
                            }}
                            className="flex-1"
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDownIcon className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table.getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Loading state */}
                {isFetching && (
                    <div className="w-full py-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                        <p className="mt-2 text-gray-600">Loading bookings...</p>
                    </div>
                )}

                {/* Table with responsive container */}
                {!isFetching && (
                    <div className="overflow-hidden border rounded-lg shadow-sm">
                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} className="bg-gray-50 text-gray-700 font-semibold px-4 py-2 whitespace-nowrap">
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                            <TableHead className="text-center bg-gray-50 whitespace-nowrap">Actions</TableHead>
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row, idx) => (
                                            <TableRow
                                                key={row.id}
                                                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-blue-50"}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="px-4 py-2">
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                                <TableCell className="px-4 py-2 whitespace-nowrap">
                                                    <div className="flex justify-center gap-2">
                                                        <Button
                                                            className="py-1 px-3 rounded bg-amber-500 hover:bg-amber-600 text-white transition"
                                                            onClick={() => handleUpdate(row.original)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            className="py-1 px-3 rounded bg-red-500 hover:bg-red-600 text-white transition"
                                                            onClick={() => handleDelete(row.original._id as string)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                                {error ? (
                                                    <div className="text-red-500">Error loading data. Please try again.</div>
                                                ) : (
                                                    <div className="text-gray-500">No bookings found.</div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex flex-wrap items-center justify-end gap-2 py-2">
                    <div className="flex-1 text-sm text-gray-700">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Rows per page</span>
                            <select
                                className="rounded border-gray-200 px-2 py-1"
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => table.setPageSize(Number(e.target.value))}
                            >
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<<"}
                            </Button>
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
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                {">>"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;