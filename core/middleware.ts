import { NextRequest, NextResponse } from "next/server";

const allowedPatterns = [
  /^http:\/\/localhost:3000$/,
  /^http:\/\/127\.0\.0\.1:3000$/,
  /^http:\/\/192\.168\.\d+\.\d+:3000$/,
  /^http:\/\/10\.\d+\.\d+\.\d+:3000$/,
  /^http:\/\/172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+:3000$/,
];

// Type Predicate → ช่วย TS แยกแยะว่า origin เป็น string แน่นอน
function isAllowedOrigin(origin: string | null): origin is string {
  if (!origin) return false;
  return allowedPatterns.some((regex) => regex.test(origin));
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (isAllowedOrigin(origin)) {
    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res;
  }

  return NextResponse.json(
    { error: "Origin not allowed", origin },
    { status: 403 }
  );
}

export const config = {
  matcher: "/api/:path*",
};
