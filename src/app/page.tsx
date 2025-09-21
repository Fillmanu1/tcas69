import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <main className="form-container flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold mb-2">ระบบ Portfolio สำหรับ TCAS69</h1>
        <p className="text-base text-center mb-4">
          สมัคร TCAS69 ด้วย Portfolio
          <br />
          กรอกข้อมูลส่วนตัว, อัปโหลดรูปภาพ, กิจกรรม, รางวัล, ผลงาน
          <br />
          ครูสามารถดูรายชื่อและรายละเอียดนักเรียนได้
        </p>
        <div className="flex gap-6">
          <Link
            href="/portfolio"
            className="rounded bg-blue-600 text-white px-6 py-2 font-semibold hover:bg-blue-700 transition"
          >
            สมัคร Portfolio
          </Link>
          <Link
            href="/teacher"
            className="rounded bg-green-600 text-white px-6 py-2 font-semibold hover:bg-green-700 transition"
          >
            สำหรับครู
          </Link>
        </div>
      </main>
      <footer className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TCAS69 Portfolio Demo
      </footer>
    </div>
  );
}
