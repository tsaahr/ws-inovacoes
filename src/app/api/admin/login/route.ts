import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const body = (await request.json().catch(() => null)) as {
    password?: string;
  } | null;

  if (!adminPassword) {
    return NextResponse.json(
      { success: false, error: "ADMIN_PASSWORD não configurada." },
      { status: 500 },
    );
  }

  if (!body?.password || body.password !== adminPassword) {
    return NextResponse.json(
      { success: false, error: "Senha inválida." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("ADMIN_PASSWORD", adminPassword, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
