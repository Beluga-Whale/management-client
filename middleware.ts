import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
    return redirectToLogin(req);
  }

  try {
    //NOTE- ตรวจสอบว่า token หมดอายุหรือไม่
    const decoded = jwtDecode(token ?? "");

    if (!decoded || (decoded.exp && decoded.exp * 1000 < Date.now())) {
      // Token หมดอายุ → ลบ cookie แล้ว redirect ไปหน้า login
      const response = redirectToLogin(req);
      response.cookies.delete("jwt"); // ลบ token ที่หมดอายุ
      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  return NextResponse.redirect(new URL("/login", req.url));
}

//NOTE - Apply middleware เฉพาะหน้า /tasks
export const config = {
  matcher: ["/tasks/:path*"],
};
