import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Faz login na API externa (NestJS)
    const response = await axios.post("https://sua-api.com/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    // Salva o token no cookie HttpOnly (seguro e acessível no servidor)
    const res = NextResponse.json({ user });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 },
    );
  }
}
