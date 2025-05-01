import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    flexRender,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CaretSortIcon } from "@radix-ui/react-icons";

// Example ITourist interface (you already have this)
export interface ITourist {
    _id?: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    userId: string;
    preferences?: string[];
    nationality?: string;
    languages?: string[];
    specialRequirement?: string;
    whatsapp?: string;
    touristId: string;
    is_active?: boolean;
}

// Define your columns for the table
const touristColumns = [
    {
        accessorKey: "firstName",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                First Name <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "profilePhoto",
        header: "Photo",
        cell: ({ row }) => (
            <img
                src={row.getValue("profilePhoto") || "/default-avatar.png"}
                alt="Profile"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
        ),
    },
    {
        accessorKey: "nationality",
        header: "Nationality",
        cell: (info) => info.getValue() || "N/A",
    },
    {
        accessorKey: "preferences",
        header: "Preferences",
        cell: ({ row }) => {
            const prefs = row.getValue("preferences") as string[] | undefined;
            return prefs && prefs.length > 0 ? prefs.join(", ") : "N/A";
        },
    },
    {
        accessorKey: "languages",
        header: "Languages",
        cell: ({ row }) => {
            const langs = row.getValue("languages") as string[] | undefined;
            return langs && langs.length > 0 ? langs.join(", ") : "N/A";
        },
    },
    {
        accessorKey: "whatsapp",
        header: "WhatsApp",
        cell: (info) => info.getValue() || "N/A",
    },
    {
        accessorKey: "is_active",
        header: "Active",
        cell: (info) => (
            <span
                style={{
                    color: info.getValue() ? "green" : "red",
                    fontWeight: "bold",
                }}
            >
        {info.getValue() ? "Yes" : "No"}
      </span>
        ),
    },
];

// Dummy hook to fetch tourists, replace with your real API hook
const useGetTourists = () => {
    // Replace this with your actual data fetching logic
    const [data] = React.useState<ITourist[]>([
        {
            _id: "1",
            firstName: "John",
            lastName: "Doe",
            profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
            userId: "user1",
            preferences: ["Adventure", "Cultural"],
            nationality: "USA",
            languages: ["English", "Spanish"],
            whatsapp: "+1234567890",
            touristId: "tourist1",
            is_active: true,
        },
        {
            _id: "2",
            firstName: "Jane",
            lastName: "Smith",
            profilePhoto: "",
            userId: "user2",
            preferences: [],
            nationality: "Canada",
            languages: ["English", "French"],
            whatsapp: "+1987654321",
            touristId: "tourist2",
            is_active: false,
        },
    ]);
    return { data, error: null, isFetching: false };
};

const TouristPage = () => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const { data, error, isFetching } = useGetTourists();

    const table = useReactTable({
        data: data || [],
        columns: touristColumns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    if (isFetching) return <div>Loading...</div>;
    if (error) return <div>Error loading tourists.</div>;

    return (
        <div className="w-full p-4">
            <h1 className="mb-4 text-2xl font-bold">Tourists</h1>
            <Input
                placeholder="Filter by First Name"
                value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
                onChange={(e) =>
                    table.getColumn("firstName")?.setFilterValue(e.target.value)
                }
                className="max-w-sm mb-4"
            />
            <div className="overflow-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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
                                <TableCell colSpan={touristColumns.length} className="text-center">
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

export default TouristPage;
