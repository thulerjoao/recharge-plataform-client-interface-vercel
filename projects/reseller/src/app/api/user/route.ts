import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const response = await axios.get("https://sua-api.com/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao obter usuário" },
      { status: 401 },
    );
  }
}
