import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

export default function useGetNotifications() {
  const { lang } = useSelector((state) => state.language);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["notifications", lang, page],
    queryFn: async () => {
      try {
        const res = await axiosInstance.post("/get_notification", {
          type: "market",
          skip: 9,
        });
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
