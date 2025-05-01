import { Product } from "@/pages/ProductPage";
import { useQuery } from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";

export const useGetProduct = () => {
    const getAllProduct = async () => {
        try {
            const response = await AxiosInstance.get<Product[]>("/products/find-all");
            return response.data; // Return the product data (potentially empty)
        } catch (error) {
            // Handle potential errors during API call
            console.error("Error fetching products:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllProduct definition
    const { data, error,isFetching,refetch } = useQuery<Product[]>({
        queryKey: ["fetchAllProduct"],
        queryFn: getAllProduct,
        refetchInterval: 5000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
};





