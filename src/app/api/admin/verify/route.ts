import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!verifyToken(token)) {
    return NextResponse.json(
      { success: false, error: "인증이 만료되었습니다." },
      { status: 401 }
    );
  }
  return NextResponse.json({ success: true });
}
