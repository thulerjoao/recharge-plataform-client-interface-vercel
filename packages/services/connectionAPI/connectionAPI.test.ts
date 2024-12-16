/* eslint-disable jest/expect-expect */
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
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  const url = "/test";

  it("should successfully perform a GET request", async () => {
    const responseData = { data: "success" };

    mock.onGet(url).reply(200, "success");

    const result = await connectionAPIGet<typeof responseData>(url);
    expect(result).toEqual(responseData);
  });

  it("should succssfully perform a POST request", async () => {
    const requestBody = { name: "test" };
    const responseData = { id: 1, ...requestBody };

    mock.onPost(url).reply(201, responseData);

    const result = await connectionAPIPost<typeof responseData>(
      url,
      requestBody,
    );

    expect(result).toEqual(responseData);
  });

  it("should handle a PUT request", async () => {
    const requestBody = { name: "Updated test" };
    const responseData = { id: 1, ...requestBody };

    mock.onPut(url).reply(200, responseData);

    const result = await connectionAPIPut<typeof responseData>(
      url,
      requestBody,
    );

    expect(result).toEqual(responseData);
  });

  it("should handle a PATCH request", async () => {
    const requestBody = { name: "Partial update" };
    const responseData = { id: 1, ...requestBody };

    mock.onPut(url).reply(200, responseData);

    const result = await connectionAPIPatch<typeof responseData>(
      url,
      requestBody,
    );

    expect(result).toEqual(responseData);
  });

  it("should handle a delete request", async () => {
    mock.onDelete(url).reply(204);

    const result = await connectionAPIDelete<null>(url);
    expect(result).toBeNull();
  });

  it("should throw an error for unauthorized access", async () => {
    mock.onGet(url).reply(401);
    await expect(connectionAPIGet(url)).rejects.toThrow("Acesso negado");
  });

  it("should throw a generic error for other status codes", async () => {
    mock.onGet(url).reply(500);
    await expect(connectionAPIGet(url)).rejects.toThrow("Falha ao carregar");
  });
});
