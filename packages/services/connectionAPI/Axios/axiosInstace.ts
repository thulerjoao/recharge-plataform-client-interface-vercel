import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const createApiInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const response = await axios.get("/api/token", {
          withCredentials: true,
        });
        const accessToken = response.data?.accessToken;
        if (accessToken) {
          config.headers.set("Authorization", `Bearer ${accessToken}`);
        }
        config.headers.set("Content-Type", "application/json");
        config.headers.set("ngrok-skip-browser-warning", "true");

        return config;
      } catch (error) {
        return config;
      }
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(error),
  );

  return api;
};

export default createApiInstance;
