import Api from "./axiosInstace";
import { MethodEnum } from "./methodEnum";

export type MethodType = "get" | "post" | "put" | "patch" | "delete";

export default class ConnectionAPI {
  static async call<T>(
    url: string,
    method: MethodType,
    body?: unknown,
  ): Promise<T> {
    switch (method) {
      case MethodEnum.DELETE:
      case MethodEnum.GET:
        return (await Api[method]<T>(url)).data;
      case MethodEnum.POST:
      case MethodEnum.PUT:
      case MethodEnum.PATCH:
      default:
        return (await Api[method]<T>(url, body)).data;
    }
  }

  static async connect<T>(
    url: string,
    method: MethodType,
    body?: unknown,
  ): Promise<T> {
    return this.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            throw new Error("Acesso negado");

          default:
            throw new Error("Falha ao carregar");
        }
      }
      throw new Error("Falha ao carregar");
    });
  }
}
