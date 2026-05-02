import { NextResponse } from "next/server";
import { getAuctionById } from "@/lib/services/auctions";

export const dynamic = "force-dynamic";

type AuctionRouteProps = {
  params: { id: string };
};

export async function GET(_: Request, { params }: AuctionRouteProps) {
  const auction = await getAuctionById(params.id);

  if (!auction) {
    return NextResponse.json({ error: "Auction not found." }, { status: 404 });
  }

  return NextResponse.json({ auction });
}
