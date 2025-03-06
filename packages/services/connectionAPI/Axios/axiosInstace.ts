import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const createApiInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const response = await axios.get("/api/token", {
          withCredentials: true,
        });

        const token = response.data?.token;

        if (token) {
          config.headers.set("Authorization", `Bearer ${token}`);
          config.headers.set("Content-Type", "application/json");
        }
        config.headers.set("ngrok-skip-browser-warning", "true");

        return config;
      } catch (error) {
        console.error("Erro ao obter token:", error);
        return config;
      }
    },
    (error) => Promise.reject(error),
  );

  return api;
};

export default createApiInstance;
