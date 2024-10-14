import axios from "axios";
import ConnectionAPI from "./Axios/axiosConnection";
import { MethodEnum } from "./Axios/methodEnum";
import {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
  connectionAPIPost,
  connectionAPIPut,
} from "./connection";

jest.mock("./Axios/axiosConnection");
jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("connectionAPI functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should make a GET request using connectionAPIGet", async () => {
    mockAxios.get.mockResolvedValueOnce({ data: "mocked data" });

    const result = await connectionAPIGet<string>("test-url");

    expect(mockAxios.get).toHaveBeenCalledWith("test-url");
    expect(result).toEqual("mocked data");
  });

  test("should make a POST request using connectionAPIPost", async () => {
    const mockBody = { key: "value" };
    mockAxios.post.mockResolvedValueOnce({ data: "mocked post data" });

    const result = await connectionAPIPost<string>("test-url", mockBody);

    expect(mockAxios.post).toHaveBeenCalledWith("test-url", mockBody);
    expect(result).toEqual("mocked post data");
  });
});

describe("Connection API Functions", () => {
  const mockConnect = jest.spyOn(ConnectionAPI, "connect");
  beforeEach(() => {
    // Limpa as instâncias dos mocks antes de cada teste.
    jest.clearAllMocks();
  });

  test("should make a GET request", async () => {
    const mockResponse = { data: "response data" };
    mockConnect.mockResolvedValueOnce(mockResponse);

    const result = await connectionAPIGet<{ data: string }>("test-url");

    expect(mockConnect).toHaveBeenCalledWith("test-url", MethodEnum.GET);
    expect(result).toEqual(mockResponse);
  });

  test("should make a DELETE request", async () => {
    const mockResponse = { data: "deleted" };
    mockConnect.mockResolvedValueOnce(mockResponse);

    const result = await connectionAPIDelete<{ data: string }>("test-url");

    expect(mockConnect).toHaveBeenCalledWith("test-url", MethodEnum.DELETE);
    expect(result).toEqual(mockResponse);
  });

  test("should make a POST request", async () => {
    const mockResponse = { data: "created" };
    const mockBody = { key: "value" };
    mockConnect.mockResolvedValueOnce(mockResponse);

    const result = await connectionAPIPost<{ data: string }>(
      "test-url",
      mockBody,
    );

    expect(mockConnect).toHaveBeenCalledWith(
      "test-url",
      MethodEnum.POST,
      mockBody,
    );
    expect(result).toEqual(mockResponse);
  });

  test("should make a PUT request", async () => {
    const mockResponse = { data: "updated" };
    const mockBody = { key: "value" };
    mockConnect.mockResolvedValueOnce(mockResponse);

    const result = await connectionAPIPut<{ data: string }>(
      "test-url",
      mockBody,
    );

    expect(mockConnect).toHaveBeenCalledWith(
      "test-url",
      MethodEnum.PUT,
      mockBody,
    );
    expect(result).toEqual(mockResponse);
  });

  test("should make a PATCH request", async () => {
    const mockResponse = { data: "patched" };
    const mockBody = { key: "value" };
    mockConnect.mockResolvedValueOnce(mockResponse);

    const result = await connectionAPIPatch<{ data: string }>(
      "test-url",
      mockBody,
    );

    expect(mockConnect).toHaveBeenCalledWith(
      "test-url",
      MethodEnum.PATCH,
      mockBody,
    );
    expect(result).toEqual(mockResponse);
  });

  test("should handle errors", async () => {
    const mockError = new Error("Request failed");
    mockConnect.mockRejectedValueOnce(mockError);

    await expect(connectionAPIGet("test-url")).rejects.toThrow(
      "Request failed",
    );
    expect(mockConnect).toHaveBeenCalledWith("test-url", MethodEnum.GET);
  });
});
