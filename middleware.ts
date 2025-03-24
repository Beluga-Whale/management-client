import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

//NOTE - Apply middleware เฉพาะหน้า /tasks
export const config = {
  matcher: ["/tasks/:path*"],
};
