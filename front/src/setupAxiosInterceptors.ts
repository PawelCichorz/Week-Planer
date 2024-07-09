import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "./backend";

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("accessToken");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const tokenValidityThreshold = 60000; // 2 minuty przed wygaśnięciem

        if (expirationTime - currentTime < tokenValidityThreshold) {
          if (!isRefreshing) {
            isRefreshing = true;
            try {
              const newToken = await refreshAccessToken(history);
              token = newToken || token;
              onRefreshed(token);
            } catch (error) {
              console.error("Błąd podczas odświeżania tokena:", error);
              token = null;
              onRefreshed(token);
            } finally {
              isRefreshing = false;
            }
          } else {
            token = await new Promise<string | null>((resolve) => {
              subscribeTokenRefresh((newToken) => {
                resolve(newToken || token);
              });
            });
          }
        }

        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshAccessToken(history);
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        }
      }
      return Promise.reject(error);
    },
  );
};

const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export default setupAxiosInterceptors;
