import axios, { AxiosInstance } from "axios";

const createApiInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(async (config: any) => {
    try {
      const response = await axios.get("http://localhost:3000/api/token", {
        withCredentials: true,
      });

      const token = response.data?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers["Content-Type"] = "application/json";
      return config;
    } catch (error) {
      /* empty */
    }
  });

  return api;
};

export default createApiInstance;
