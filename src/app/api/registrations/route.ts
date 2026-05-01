import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import type { RegistrationInput } from "@/lib/types";

// POST — 공개: 관심고객 등록
export async function POST(request: NextRequest) {
  try {
    const body: RegistrationInput = await request.json();

    if (!body.name || !body.phone2 || !body.phone3 || !body.agreed) {
      return NextResponse.json(
        { success: false, error: "필수 항목을 입력해주세요." },
        { status: 400 }
      );
    }

    const phone = `${body.phone1 || "010"}-${body.phone2}-${body.phone3}`;
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO registrations (name, phone, phone1, phone2, phone3, interest_type, age, city, district, dong, agreed)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      body.name.trim(),
      phone,
      body.phone1 || "010",
      body.phone2,
      body.phone3,
      body.interestType || "",
      body.age || "",
      body.city || "",
      body.district || "",
      body.dong || "",
      1
    );

    return NextResponse.json(
      { success: true, data: { id: result.lastInsertRowid } },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration POST error:", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// GET — 인증 필요: 목록 조회
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
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20")));
    const search = searchParams.get("search") || "";
    const interestType = searchParams.get("interestType") || "";
    const age = searchParams.get("age") || "";
    const city = searchParams.get("city") || "";
    const sortBy = searchParams.get("sortBy") || "created_at";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? "ASC" : "DESC";
    const dateFrom = searchParams.get("dateFrom") || "";
    const dateTo = searchParams.get("dateTo") || "";

    const conditions: string[] = [];
    const params: (string | number)[] = [];

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

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const allowedSortColumns = ["created_at", "name", "phone", "interest_type", "age", "city"];
    const safeSortBy = allowedSortColumns.includes(sortBy) ? sortBy : "created_at";

    const db = getDb();
    const total = (
      db.prepare(`SELECT COUNT(*) as count FROM registrations ${whereClause}`).get(...params) as { count: number }
    ).count;

    const offset = (page - 1) * pageSize;
    const data = db
      .prepare(
        `SELECT * FROM registrations ${whereClause} ORDER BY ${safeSortBy} ${sortOrder} LIMIT ? OFFSET ?`
      )
      .all(...params, pageSize, offset);

    return NextResponse.json({
      success: true,
      data: {
        data,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error("Registration GET error:", err);
    return NextResponse.json(
      { success: false, error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
