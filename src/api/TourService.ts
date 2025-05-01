import {Tour} from "@/pages/TourPage.tsx";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";

export const useGetTour = () => {
    const getAllTour = async () => {
        try {
            const response = await AxiosInstance.get<Tour[]>("/tours/find-all");
            return response.data.data; // Return the product data (potentially empty)
        } catch (error) {
            // Handle potential errors during API call
            console.error("Error fetching Tour:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllProduct definition
    const { data, error,isFetching,refetch } = useQuery<Tour[]>({
        queryKey: ["fetchAllTour"],
        queryFn: getAllTour,
        refetchInterval: 5000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
};





