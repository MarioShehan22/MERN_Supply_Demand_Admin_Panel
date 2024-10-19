import {Supply} from "@/pages/SupplyDetailPage";
import {useQuery} from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";

export const UseGetSupply = () => {
    const getAllSupply = async () => {
        try {
            const response = await AxiosInstance.get<Supply[]>("/suppliers/find-all");
            return response.data; // Return the product data (potentially empty)
        } catch (error) {
            console.error("Error fetching Order:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllProduct definition
    const { data, error,isFetching,refetch } = useQuery<Supply[]>({
        queryKey: ["fetchAllSupply"],
        queryFn: getAllSupply,
        refetchInterval: 5000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
}
