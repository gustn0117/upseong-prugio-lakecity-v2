import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import type { Registration } from "@/lib/types";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!verifyToken(token)) {
    return NextResponse.json(
      { success: false, error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const interestType = searchParams.get("interestType") || "";
    const age = searchParams.get("age") || "";
    const city = searchParams.get("city") || "";
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";

    const conditions: string[] = [];
    const params: string[] = [];

    if (search) {
      conditions.push("(name LIKE ? OR phone LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }
    if (interestType) {
      conditions.push("interest_type = ?");
      params.push(interestType);
    }
    if (age) {
      conditions.push("age = ?");
      params.push(age);
    }
    if (city) {
      conditions.push("city = ?");
      params.push(city);
    }
    if (dateFrom) {
      conditions.push("date(created_at) >= ?");
      params.push(dateFrom);
    }
    if (dateTo) {
      conditions.push("date(created_at) <= ?");
      params.push(dateTo);
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const db = getDb();
    const rows = db
      .prepare(
        `SELECT * FROM registrations ${whereClause} ORDER BY created_at DESC`
      )
      .all(...params) as Registration[];

    // BOM for Korean Excel compatibility
    const BOM = "\uFEFF";
    const header = "No.,성명,연락처,관심유형,연령대,시/도,시/구/군,읍/면/동,등록일시";
    const csvRows = rows.map(
      (r, i) =>
        `${i + 1},"${r.name}","${r.phone}","${r.interest_type}","${r.age}","${r.city}","${r.district}","${r.dong}","${r.created_at}"`
    );
    const csv = BOM + header + "\n" + csvRows.join("\n");

    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="registrations_${dateStr}.csv"`,
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
