import {useQuery} from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";
import {Booking} from "@/pages/BookingDetailsPage.tsx";

export const UseGetBooking = () => {
    const getAllBookings = async () => {
        try {
            const response = await AxiosInstance.get<Booking[]>("/booking/find-All");
            // @ts-ignore
            return response.data.data; // Return the product data (potentially empty)
        } catch (error) {
            console.error("Error fetching booking:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllProduct definition
    const { data, error,isFetching,refetch } = useQuery<Booking[]>({
        queryKey: ["fetchAllBooking"],
        queryFn: getAllBookings,
        refetchInterval: 500000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
}
