import AxiosInstance from "@/config/AxiosInstance";
import {useQuery} from "@tanstack/react-query";
import {Location} from "@/pages/LocationDetailPage.tsx";

export function useGetLocations() {
    const getAllSupply = async () => {
        try {
            const response = await AxiosInstance.get<Location[]>("/location/find-all");
            return response.data.data.data; // Return the product data (potentially empty)
        } catch (error) {
            console.error("Error fetching Location:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllProduct definition
    const { data, error,isFetching,refetch } = useQuery<Location[]>({
        queryKey: ["fetchAllSupply"],
        queryFn: getAllSupply,
        refetchInterval: 500000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
}