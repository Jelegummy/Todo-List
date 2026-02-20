import { GoBook, GoHome } from 'react-icons/go'
import { SiGoogleclassroom } from 'react-icons/si'
import { IoMdPaper } from 'react-icons/io'
import { TbLockPassword } from 'react-icons/tb'

export const USER_ROUTES = [
  {
    title: 'หน้าแรก',
    route: '/dashboard',
    icon: <GoHome className="h-6 w-6" />,
  },
  {
    title: 'ห้องเรียน',
    route: '/dashboard/classroom',
    icon: <SiGoogleclassroom className="h-6 w-6" />,
  },
  {
    title: 'ตั้งค่า',
    route: '/dashboard/setting',
    icon: <TbLockPassword className="h-6 w-6" />,
  },
]
