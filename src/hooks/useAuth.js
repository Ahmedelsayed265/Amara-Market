import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { setIsLogged, setUser } from "../redux/slices/authedUser";
import axiosInstance from "../utils/axiosInstance";
import useGetAuthedUser from "./profile/useGetAuthedUser";

const useAuth = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token", "id"]);
  const token = cookies?.token;
  const id = cookies?.id;

  let decodedToken = null;
  let isExpired = false;

  const handleLogout = () => {
    dispatch(setUser({}));
    dispatch(setIsLogged(false));
    setLoading(false);
  };

  if (token) {
    try {
      decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      isExpired = decodedToken.exp < currentTime;
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const {
    data: profile,
    isFetched,
    refetch,
  } = useGetAuthedUser(Boolean(token && id && !isExpired));

  useEffect(() => {
    if (isExpired || !token || !id) {
      handleLogout();
      return;
    }

    if (Number(decodedToken?.sub) !== id) {
      handleLogout();
      return;
    }

    if (isFetched) {
      if (profile) {
        dispatch(setUser(profile));
        dispatch(setIsLogged(true));
        setLoading(false);
      } else {
        refetch().then(() => setLoading(false));
      }
    } else {
      refetch().then(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decodedToken?.sub, dispatch, id, isExpired, isFetched, profile, refetch]);

  return { loading, profile };
};

export default useAuth;
