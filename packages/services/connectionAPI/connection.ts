import ConnectionAPI from "./Axios/axiosConnection";
import { MethodEnum } from "./Axios/methodEnum";

export const connectionAPIGet = async <T>(
  url: string,
  baseURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.GET, undefined, baseURL);
};

export const connectionAPIDelete = async <T>(
  url: string,
  baseURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.DELETE, undefined, baseURL);
};

export const connectionAPIPost = async <T>(
  url: string,
  body: unknown,
  baseURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.POST, body, baseURL);
};

export const connectionAPIPut = async <T>(
  url: string,
  body: unknown,
  baseURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PUT, body, baseURL);
};

export const connectionAPIPatch = async <T>(
  url: string,
  body: unknown,
  baseURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PATCH, body, baseURL);
};
