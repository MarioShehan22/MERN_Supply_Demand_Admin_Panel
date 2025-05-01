import {User} from "@/pages/UserDetailsPage";
import {useQuery} from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";

export const useGetUsers = () => {
    const getAllUsers = async () => {
        try {
            const response = await AxiosInstance.get<User[]>("/users/find-all");
            return response.data; // Return the product data (potentially empty)
        } catch (error) {
            console.error("Error fetching Users:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllAddress definition
    const { data, error,isFetching,refetch } = useQuery<User[]>({
        queryKey: ["fetchAllUsers"],
        queryFn: getAllUsers,
        refetchInterval: 5000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
};
