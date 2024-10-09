import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";


export default function useGetOrderById(id) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/market/get_market_order", {
          id,
        });
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw error;
      }
    },
    enabled: Boolean(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
