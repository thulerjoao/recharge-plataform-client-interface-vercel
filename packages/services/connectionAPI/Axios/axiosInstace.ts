import axios, { AxiosInstance } from "axios";

const Api: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.107:3333/",
});

Api.interceptors.request.use(async (config: any) => {
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

export default Api;

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
