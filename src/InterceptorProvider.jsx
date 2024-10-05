import { useLayoutEffect } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "./utils/axiosInstance";

const setupAxiosInterceptors = (setCookie) => {
  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const cookies = document.cookie.split(";");
          let token = "";

          cookies.forEach((cookie) => {
            if (cookie.includes("token")) {
              token = cookie.split("=")[1];
            }
          });

          delete axiosInstance.defaults.headers.common.Authorization;

          const res = await axiosInstance.post("/market/refresh_token", {
            token: token,
          });

          if (res.data.code === 200 && res.data.data) {
            const newToken = res.data.data.token;

            setCookie("token", newToken, {
              path: "/",
              secure: true,
              sameSite: "Strict",
            });

            axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            return axiosInstance(originalRequest);
          } else {
            throw new Error("Token refresh failed");
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          return Promise.reject(err);
        }
      }

      return Promise.reject(err);
    }
  );
};

const InterceptorProvider = ({ children }) => {
  const [, setCookie] = useCookies();

  useLayoutEffect(() => {
    setupAxiosInterceptors(setCookie);
  }, [setCookie]);

  return <>{children}</>;
};

export default InterceptorProvider;
