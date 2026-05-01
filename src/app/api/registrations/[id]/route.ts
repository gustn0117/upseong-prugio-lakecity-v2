import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.cookies.get("admin_token")?.value;
  if (!verifyToken(token)) {
    return NextResponse.json(
      { success: false, error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  try {
    const db = getDb();
    const row = db
      .prepare("SELECT * FROM registrations WHERE id = ?")
      .get(parseInt(params.id));

    if (!row) {
      return NextResponse.json(
        { success: false, error: "데이터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: row });
  } catch (err) {
    console.error("Registration GET [id] error:", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.cookies.get("admin_token")?.value;
  if (!verifyToken(token)) {
    return NextResponse.json(
      { success: false, error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  try {
    const db = getDb();
    const result = db
      .prepare("DELETE FROM registrations WHERE id = ?")
      .run(parseInt(params.id));

    if (result.changes === 0) {
      return NextResponse.json(
        { success: false, error: "데이터를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Registration DELETE error:", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
