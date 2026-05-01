import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!verifyToken(token)) {
    return NextResponse.json(
      { success: false, error: "인증이 필요합니다." },
      { status: 401 }
    );
  }

  try {
    const db = getDb();

    const totalRegistrations = (
      db.prepare("SELECT COUNT(*) as count FROM registrations").get() as {
        count: number;
      }
    ).count;

    const todayRegistrations = (
      db
        .prepare(
          "SELECT COUNT(*) as count FROM registrations WHERE date(created_at) = date('now', 'localtime')"
        )
        .get() as { count: number }
    ).count;

    const byInterestType = db
      .prepare(
        "SELECT interest_type as type, COUNT(*) as count FROM registrations WHERE interest_type != '' GROUP BY interest_type ORDER BY count DESC"
      )
      .all() as { type: string; count: number }[];

    const byAge = db
      .prepare(
        "SELECT age, COUNT(*) as count FROM registrations WHERE age != '' GROUP BY age ORDER BY age"
      )
      .all() as { age: string; count: number }[];

    const byCity = db
      .prepare(
        "SELECT city, COUNT(*) as count FROM registrations WHERE city != '' GROUP BY city ORDER BY count DESC LIMIT 10"
      )
      .all() as { city: string; count: number }[];

    const recentTrend = db
      .prepare(
        "SELECT date(created_at) as date, COUNT(*) as count FROM registrations WHERE created_at >= datetime('now', '-7 days', 'localtime') GROUP BY date(created_at) ORDER BY date"
      )
      .all() as { date: string; count: number }[];

    return NextResponse.json({
      success: true,
      data: {
        totalRegistrations,
        todayRegistrations,
        byInterestType,
        byAge,
        byCity,
        recentTrend,
      },
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
