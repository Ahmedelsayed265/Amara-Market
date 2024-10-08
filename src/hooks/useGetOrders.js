import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";

export default function useGetOrders() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", status, from, to],
    queryFn: async () => {
      const payload = {};
      if (status !== "all") {
        payload.status = status;
      }
      if (from !== "") {
        payload.from = from;
      }
      if (to !== "") {
        payload.to = to;
      }

      try {
        const res = await axiosInstance.post(
          "/market/get_market_orders",
          payload
        );
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw error;
      }
    },

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
