import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { orderSchema } from "@/lib/schemas";
import { placeWalletOrder } from "@/lib/services/wallet";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to place a wallet order." }, { status: 401 });
  }

  if (!["buyer", "admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Only buyers can place wallet orders." }, { status: 403 });
  }

  const body = await request.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order payload", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const order = await placeWalletOrder({
      ...parsed.data,
      userId: session.user.id,
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not place wallet order." },
      { status: 400 },
    );
  }
}
