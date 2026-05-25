import { NextRequest, NextResponse } from "next/server";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function GET(request: NextRequest) {
  const message =
    request.nextUrl.searchParams.get("message") ||
    "Hi EasyCollege, I need help with TS EAMCET counselling.";

  return NextResponse.redirect(buildWhatsAppUrl(message));
}
