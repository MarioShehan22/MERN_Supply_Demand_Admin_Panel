import {Order} from "@/pages/OrderDetailPage";
import {useQuery} from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";

export const UseGetOrder = () => {
    const getAllOrders = async () => {
        try {
            const response = await AxiosInstance.get<Order[]>("/orders/find-All");
            return response.data; // Return the product data (potentially empty)
        } catch (error) {
            console.error("Error fetching Order:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllProduct definition
    const { data, error,isFetching,refetch } = useQuery<Order[]>({
        queryKey: ["fetchAllOrder"],
        queryFn: getAllOrders,
        refetchInterval: 5000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
}
