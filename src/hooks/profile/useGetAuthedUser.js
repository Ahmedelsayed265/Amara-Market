import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetAuthedUser(enabled) {
  const { lang } = useSelector((state) => state.language);
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["authed-user", lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/market/get_profile");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        throw error;
      }
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error, refetch, isFetched };
}
