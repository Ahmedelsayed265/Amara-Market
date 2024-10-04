import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetCategories() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/get_categories");
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
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useGetCategories;
