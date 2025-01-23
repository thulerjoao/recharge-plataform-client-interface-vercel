import axios, { AxiosInstance } from "axios";

const createApiInstance = (baseURL: string): AxiosInstance => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(async (config: any) => {
    try {
      const getToken = async () => {
        return sessionStorage.getItem("token");
      };
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers.contentType = "application/json";
      }

      return config;
    } catch (error) {
      /* empty */
    }
  });

  return api;
};

export default createApiInstance;

// type Body = {
//   accessToken?: string
//   refreshToken?: string
// }

// type HttpResponse = {
//   statusCode: number
//   body: Body
// }

// const httpDecorator = (response: HttpResponse): HttpResponse => {
//   if (response.body.accessToken) {
//     setLocalStorage('accessToken', response.body.accessToken)
//   }
//   if (response.body.refreshToken) {
//     setCookie('refreshToken', response.body.refreshToken)
//   }
//   return response
// }
