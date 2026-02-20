'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { CheckCircle2, LayoutDashboard, Tags, Clock } from 'lucide-react'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="font-sans">
      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <Navbar />

        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            จัดการทุกงานของคุณให้เป็นเรื่องง่าย{' '}
          </h1>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#2460E3] drop-shadow-sm sm:text-5xl md:text-6xl">
            ด้วย TODO LIST
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/80 sm:text-xl">
            บันทึกงาน, จัดหมวดหมู่, ตั้งเวลาครบกำหนด
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            {session?.user ? (
              <Link
                href="/dashboard"
                className="flex w-full items-center justify-center rounded-xl bg-[#2460E3] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl sm:w-auto"
              >
                ไปที่ Dashboard ของคุณ
                <LayoutDashboard className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <>
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center rounded-xl bg-[#2460E3] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl sm:w-auto"
                >
                  เริ่มต้นใช้งานฟรี
                </Link>
                <Link
                  href="/login"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-white/80 bg-white/80 px-8 py-4 text-base font-semibold text-gray-800 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:border-gray-200 hover:bg-white hover:shadow-md sm:w-auto"
                >
                  เข้าสู่ระบบ
                </Link>
              </>
            )}
          </div>
        </main>

        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
          <div className="flex h-8 w-5 justify-center rounded-full border-2 border-gray-400 p-1">
            <div className="h-2 w-1 rounded-full bg-gray-400" />
          </div>
        </div> */}
      </div>

      {/* <div className="bg-gray-50 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              ฟีเจอร์ที่ช่วยให้คุณทำงานง่ายขึ้น
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<LayoutDashboard className="h-6 w-6" />}
              title="Dashboard สรุปผล"
              description="ติดตามภาพรวมของงานทั้งหมด พร้อมสถิติสถานะงานที่ช่วยให้คุณจัดการเวลาได้ดีขึ้น"
            />
            <FeatureCard
              icon={<Tags className="h-6 w-6" />}
              title="จัดหมวดหมู่ & แท็ก"
              description="แยกประเภทงานด้วย Category และแท็กผู้เกี่ยวข้องได้อย่างอิสระและเป็นระเบียบ"
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6" />}
              title="กำหนดเวลาชัดเจน"
              description="ตั้งวันครบกำหนด (Due Date) ให้แต่ละงาน เพื่อไม่ให้พลาดทุกเดดไลน์สำคัญ"
            />
            <FeatureCard
              icon={<CheckCircle2 className="h-6 w-6" />}
              title="ติดตามสถานะ"
              description="ปรับสถานะงาน (Todo, In Progress, Done) ง่ายๆ ให้เห็นความคืบหน้าของโปรเจกต์"
            />
          </div>
        </div>
      </div> */}
    </div>
  )
}

// function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode
//   title: string
//   description: string
// }) {
//   return (
//     <div className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
//       <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50/80 text-[#2460E3] transition-colors group-hover:bg-[#2460E3] group-hover:text-white">
//         {icon}
//       </div>
//       <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
//       <p className="text-sm leading-relaxed text-gray-600">{description}</p>
//     </div>
//   )
// }
