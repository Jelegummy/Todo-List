import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { LogOut, CircleUserRound } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 shadow-md backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl p-1">
            <Image
              src="/duck.jpg"
              alt="TODO Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            TODO LIST
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="hidden flex-col items-end sm:flex">
                <span className="text-sm font-semibold text-gray-900">
                  {session.user.name || 'ผู้ใช้งาน'}
                </span>
                <span className="text-xs text-gray-500">
                  {session.user.email}
                </span>
              </div>

              <button
                onClick={() => signOut()}
                className="flex items-center justify-center rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-red-100"
                title="ออกจากระบบ"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl bg-[#2460E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2460E3] focus:ring-offset-2"
            >
              <CircleUserRound className="h-4 w-4" />
              <span>ลงชื่อเข้าใช้</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
