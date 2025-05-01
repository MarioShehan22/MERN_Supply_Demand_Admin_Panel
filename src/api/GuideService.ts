import {useQuery} from "@tanstack/react-query";
import AxiosInstance from "@/config/AxiosInstance";
import {Guide} from "@/pages/GuideDetailPage.tsx";

export const UseGetGuides = () => {
    const getAllGuides = async () => {
        try {
            const response = await AxiosInstance.get<Guide[]>("/guides/find-all");
            // @ts-ignore
            return response.data.data.list;
        } catch (error) {
            console.error("Error fetching Guide:", error);
            return []; // Return an empty array on error
        }
    };

    // Add a semicolon after getAllGuide definition
    const { data, error,isFetching,refetch } = useQuery<Guide[]>({
        queryKey: ["fetchAllGuide"],
        queryFn: getAllGuides,
        refetchInterval: 50000,
        initialData: []
    });

    return { data, error, isFetching,refetch};
}
