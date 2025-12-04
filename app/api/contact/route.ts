import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("New contact message:", body);

  // ==== example handle ====
  // คุณสามารถ:
  // - ส่ง email
  // - บันทึกลง database
  // - ส่งเข้า Discord/Line Notify ฯลฯ

  return NextResponse.json({ ok: true });
}
