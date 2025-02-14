import ConnectionAPI from "./Axios/axiosConnection";
import { MethodEnum } from "./Axios/methodEnum";

export const connectionAPIGet = async <T>(
  url: string,
  apiURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.GET, undefined, apiURL);
};

export const connectionAPIDelete = async <T>(
  url: string,
  apiURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.DELETE, undefined, apiURL);
};

export const connectionAPIPost = async <T>(
  url: string,
  body: unknown,
  apiURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.POST, body, apiURL);
};

export const connectionAPIPut = async <T>(
  url: string,
  body: unknown,
  apiURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PUT, body, apiURL);
};

export const connectionAPIPatch = async <T>(
  url: string,
  body: unknown,
  apiURL: string,
): Promise<T> => {
  return ConnectionAPI.connect(url, MethodEnum.PATCH, body, apiURL);
};
