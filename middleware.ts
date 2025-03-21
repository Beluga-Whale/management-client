import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  // if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  // const token = req.cookies.get("jwt")?.value;
  // if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
  //   return new Response("Unauthorized", { status: 401 });
  // }
  // return NextResponse.next();
  // // ตรวจสอบคุกกี้ที่ได้จากคำขอ
  // const cookieStore = await cookies();
  // const token = cookieStore.get("jwt");
  // // const token = req.cookies.get("jwt");
  // console.log(token); // ตรวจสอบค่า token
  // if (!token && req.nextUrl.pathname.startsWith("/tasks")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
  // return NextResponse.next();
}

//NOTE - Apply middleware เฉพาะหน้า /tasks
export const config = {
  matcher: ["/tasks/:path*"],
};
