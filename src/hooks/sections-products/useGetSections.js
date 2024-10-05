import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetSections() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/market/get_menu");
        if (res.status === 200) {
          return res.data?.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}

export default useGetSections;
