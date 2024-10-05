import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

function useGetSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/get_settings");
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

export default useGetSettings;
