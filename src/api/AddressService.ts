import {Address} from "@/pages/AddressPage";
import {useQuery} from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";

export const useGetAddress = () => {
    const getAllAddress = async () => {
        try {
            const response = await AxiosInstance.get<Address[]>("/address/find-all");
            return response.data; // Return the product data (potentially empty)
        } catch (error) {
            console.error("Error fetching Address:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllAddress definition
    const { data, error,isFetching,refetch } = useQuery<Address[]>({
        queryKey: ["fetchAllAddress"],
        queryFn: getAllAddress,
        refetchInterval: 5000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
};
