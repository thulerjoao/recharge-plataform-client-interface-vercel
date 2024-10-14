import ConnectionAPI from "./Axios/axiosConnection";
import { MethodEnum } from "./Axios/methodEnum";

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.GET);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.DELETE);
};

export const connectionAPIPost = async <T>(
  url: string,
  body: unknown,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.POST, body);
};

export const connectionAPIPut = async <T>(
  url: string,
  body: unknown,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PUT, body);
};

export const connectionAPIPatch = async <T>(
  url: string,
  body: unknown,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PATCH, body);
};
