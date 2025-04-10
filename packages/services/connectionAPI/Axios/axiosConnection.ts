import Api from "./axiosInstace";
import { MethodEnum } from "./methodEnum";

export type MethodType = "get" | "post" | "put" | "patch" | "delete";

export default class ConnectionAPI {
  static async call<T>(
    url: string,
    method: MethodType,
    body?: unknown,
    baseUrl?: string,
  ): Promise<T> {
    // const apiInstance = Api(baseUrl);
    const apiInstance = await Api(baseUrl);
    switch (method) {
      case MethodEnum.DELETE:
      case MethodEnum.GET:
        return (await apiInstance[method]<T>(url)).data;
      case MethodEnum.POST:
      case MethodEnum.PUT:
      case MethodEnum.PATCH:
      default:
        return (await apiInstance[method]<T>(url, body)).data;
    }
  }

  static async connect<T>(
    url: string,
    method: MethodType,
    body?: unknown,
    baseUrl?: string,
  ): Promise<T> {
    return this.call<T>(url, method, body, baseUrl).catch((error) => {
      if (error.response) {
        // switch (error.response.status) {
        //   case 401:
        //   case 403:
        //     throw new Error("Acesso negado");

        //   default:
        //     throw error;
        //   }
        throw error;
      }
      throw new Error("Falha na comunicação com o servidor");
    });
  }
}
