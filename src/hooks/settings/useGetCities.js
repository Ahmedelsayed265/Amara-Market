import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

function useGetCities() {
  const { lang } = useSelector((state) => state.language);
  const { isLoading, data, error } = useQuery({
    queryKey: ["cities", lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/get_cities");
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

export default useGetCities;
