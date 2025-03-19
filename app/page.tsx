import { redirect } from "next/navigation";

export default function Home() {
  redirect("/tasks"); // หรืออาจจะไปที่ /login

  return null; // ไม่ต้อง render อะไร
}
