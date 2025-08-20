import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const createApiInstance = async (baseURL: string): Promise<AxiosInstance> => {
  const api = axios.create({ baseURL: baseURL });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
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
