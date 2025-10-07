import { apiUrl } from "../url";
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
    const currentBaseUrl = baseUrl ? baseUrl : apiUrl;
    const apiInstance = await Api(currentBaseUrl);
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
        throw error;
      }
      throw new Error("Server communication failed");
    });
  }
}
