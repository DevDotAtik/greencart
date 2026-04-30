import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the registration fields." },
      { status: 400 },
    );
  }

  const hashedPassword = await hash(parsed.data.password, 10);

  return NextResponse.json(
    {
      message: `Demo ${parsed.data.role} account created for ${parsed.data.email}. Password was hashed successfully.`,
      user: {
        ...parsed.data,
        password: hashedPassword,
      },
    },
    { status: 201 },
  );
}
