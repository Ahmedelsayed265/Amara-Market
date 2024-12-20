import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

export default function useGetOrders() {
  const { lang } = useSelector((state) => state.language);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const page = searchParams.get("page") || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", lang, status, from, to, page],
    queryFn: async () => {
      const payload = {
        page: page,
        skip: 12,
      };
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
          return {
            data: res.data.data,
            total: res.data.total,
          };
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
