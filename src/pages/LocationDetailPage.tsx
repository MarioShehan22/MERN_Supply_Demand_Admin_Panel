import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {ColumnFiltersState, SortingState, VisibilityState, useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender,} from "@tanstack/react-table";
import { useGetLocations } from "@/api/LocationsService.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import LocationForm from "@/components/LocationForm.tsx";

export const locationColumns: ColumnDef<Location>[] = [
    {
        accessorKey: "locationName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Location Name
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.getValue("locationName")}</div>,
    },
    {
        accessorKey: "temperature",
        header: "Temperature",
        cell: ({ row }) => <div>{row.getValue("temperature")}°C</div>,
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <img
                src={row.getValue("image")}
                alt="Location"
                style={{ width: 80, height: 60, objectFit: "cover" }}
            />
        ),
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
        accessorKey: "accessibility_info",
        header: "Accessibility",
        cell: ({ row }) => <div>{row.getValue("accessibility_info") || "N/A"}</div>,
    },
    {
        accessorKey: "best_visit_time",
        header: "Best Visit Time",
        cell: ({ row }) => <div>{row.getValue("best_visit_time")}</div>,
    },
    {
        accessorKey: "facilities",
        header: "Facilities",
        cell: ({ row }) => <div>{row.getValue("facilities") || "N/A"}</div>,
    },
    {
        accessorKey: "is_active",
        header: "Active",
        cell: ({ row }) => (
            <span
                style={{
                    color: row.getValue("is_active") ? "green" : "red",
                    fontWeight: "bold",
                }}
            >
        {row.getValue("is_active") ? "Yes" : "No"}
      </span>
        ),
    },
    {
        accessorKey: "to",
        header: "To",
        cell: ({ row }) => <div>{row.getValue("to")}</div>,
    },
];
const LocationDetailPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const { data, error, isFetching } = useGetLocations();

    const table = useReactTable({
        data,
        columns: locationColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error loading locations.</div>;

    return (
        <div className="w-full">
            <LocationForm/>
            <div className="flex items-center py-3">
                <Input
                    placeholder="Filter Locations..."
                    value={(table.getColumn("locationName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("locationName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                                <TableHead className="text-center">Update</TableHead>
                                <TableHead className="text-center">Delete</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell className="text-center">
                                        <Button className="bg-green-500 text-white">Update</Button>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button className="bg-red-400 text-white">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={locationColumns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LocationDetailPage;