import ConnectionAPI from "./Axios/axiosConnection";
import { MethodEnum } from "./Axios/methodEnum";
import * as apiClient from "./connection";

// Mock da função connect
jest.mock("./Axios/axiosConnection", () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
  },
}));

describe("API Client methods", () => {
  const mockResponse = { success: true };
  const url = "/test-endpoint";
  const apiURL = "https://api.example.com";
  const body = { key: "value" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("connectionAPIGet calls ConnectionAPI.connect with GET", async () => {
    (ConnectionAPI.connect as jest.Mock).mockResolvedValue(mockResponse);

    const result = await apiClient.connectionAPIGet(url, apiURL);

    expect(ConnectionAPI.connect).toHaveBeenCalledWith(
      url,
      MethodEnum.GET,
      undefined,
      apiURL,
    );
    expect(result).toEqual(mockResponse);
  });

  test("connectionAPIDelete calls ConnectionAPI.connect with DELETE", async () => {
    (ConnectionAPI.connect as jest.Mock).mockResolvedValue(mockResponse);

    const result = await apiClient.connectionAPIDelete(url, apiURL);

    expect(ConnectionAPI.connect).toHaveBeenCalledWith(
      url,
      MethodEnum.DELETE,
      undefined,
      apiURL,
    );
    expect(result).toEqual(mockResponse);
  });

  test("connectionAPIPost calls ConnectionAPI.connect with POST and body", async () => {
    (ConnectionAPI.connect as jest.Mock).mockResolvedValue(mockResponse);

    const result = await apiClient.connectionAPIPost(url, body, apiURL);

    expect(ConnectionAPI.connect).toHaveBeenCalledWith(
      url,
      MethodEnum.POST,
      body,
      apiURL,
    );
    expect(result).toEqual(mockResponse);
  });

  test("connectionAPIPut calls ConnectionAPI.connect with PUT and body", async () => {
    (ConnectionAPI.connect as jest.Mock).mockResolvedValue(mockResponse);

    const result = await apiClient.connectionAPIPut(url, body, apiURL);

    expect(ConnectionAPI.connect).toHaveBeenCalledWith(
      url,
      MethodEnum.PUT,
      body,
      apiURL,
    );
    expect(result).toEqual(mockResponse);
  });

  test("connectionAPIPatch calls ConnectionAPI.connect with PATCH and body", async () => {
    (ConnectionAPI.connect as jest.Mock).mockResolvedValue(mockResponse);

    const result = await apiClient.connectionAPIPatch(url, body, apiURL);

    expect(ConnectionAPI.connect).toHaveBeenCalledWith(
      url,
      MethodEnum.PATCH,
      body,
      apiURL,
    );
    expect(result).toEqual(mockResponse);
  });
});
