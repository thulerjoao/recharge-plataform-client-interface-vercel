import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
  connectionAPIPost,
  connectionAPIPut,
} from "./connection";

describe("Connection API", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  const mockUrl = "http://mocked-url/api";

  it("should successfully perform a GET request", async () => {
    const responseData = { data: "success" };
    const spyAxios = jest.spyOn(axios, "get");

    mockAxios.onGet(mockUrl).reply(200, "success");

    const result = await connectionAPIGet<typeof responseData>(mockUrl);
    console.log(result);
    expect(result).toEqual(responseData);
  });

  it("should succssfully perform a POST request", async () => {
    const requestBody = { name: "test" };
    const responseData = { id: 1, ...requestBody };

    mockAxios.onPost(mockUrl).reply(201, responseData);

    const result = await connectionAPIPost<typeof responseData>(
      mockUrl,
      requestBody,
    );

    expect(result).toEqual(responseData);
  });

  it("should handle a PUT request", async () => {
    const requestBody = { name: "Updated test" };
    const responseData = { id: 1, ...requestBody };

    mockAxios.onPut(mockUrl).reply(200, responseData);

    const result = await connectionAPIPut<typeof responseData>(
      mockUrl,
      requestBody,
    );

    expect(result).toEqual(responseData);
  });

  it("should handle a PATCH request", async () => {
    const requestBody = { name: "Partial update" };
    const responseData = { id: 1, ...requestBody };

    mockAxios.onPut(mockUrl).reply(200, responseData);

    const result = await connectionAPIPatch<typeof responseData>(
      mockUrl,
      requestBody,
    );

    expect(result).toEqual(responseData);
  });

  it("should handle a delete request", async () => {
    mockAxios.onDelete(mockUrl).reply(204);

    const result = await connectionAPIDelete<null>(mockUrl);
    expect(result).toBeNull();
  });

  it("should throw an error for unauthorized access", async () => {
    mockAxios.onGet(mockUrl).reply(401);
    await expect(connectionAPIGet(mockUrl)).rejects.toThrow("Acesso negado");
  });

  it("should throw a generic error for other status codes", async () => {
    mockAxios.onGet(mockUrl).reply(500);
    await expect(connectionAPIGet(mockUrl)).rejects.toThrow(
      "Falha ao carregar",
    );
  });
});
