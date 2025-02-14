import axios, { AxiosInstance } from "axios";

const createApiInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
    withCredentials: true, // 🔥 Permite que cookies sejam enviados automaticamente
  });

  api.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  });

  return api;
};

export default createApiInstance;

// import axios, { AxiosInstance } from "axios";

// const createApiInstance = (baseURL: string): AxiosInstance => {
//   const api = axios.create({
//     baseURL,
//   });

//   api.interceptors.request.use(async (config: any) => {
//     try {
//       const getToken = async () => {
//         return sessionStorage.getItem("token");
//       };
//       const token = await getToken();

//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//         config.headers.contentType = "application/json";
//       }

//       return config;
//     } catch (error) {
//       /* empty */
//     }
//   });

//   return api;
// };

// export default createApiInstance;
