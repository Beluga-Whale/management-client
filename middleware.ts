import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  //NOTE -  ถ้ายังไม่ได้ Login และพยายามเข้า /tasks ให้ Redirect ไป Login
  if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

//NOTE - Apply middleware เฉพาะหน้า /tasks
export const config = {
  matcher: ["/tasks/:path*"],
};
