import { connectionAPIGet, connectionAPIPost } from "../connection";

const apiURL = "http://127.0.0.11:3333"; // URL real do backend

describe("Connection API - Integração", () => {
  it("deve retornar dados válidos em uma requisição GET", async () => {
    const response = await connectionAPIGet<{ message: string }>(
      "/status",
      apiURL,
    );
    expect(response).toHaveProperty("message");
    expect(typeof response.message).toBe("string");
  });

  it("deve enviar dados corretamente em uma requisição POST", async () => {
    const response = await connectionAPIPost<{ success: boolean }>(
      "/user",
      { name: "Test User", email: "test@example.com" },
      apiURL,
    );

    expect(response).toHaveProperty("success");
    expect(response.success).toBe(true);
  });
});
