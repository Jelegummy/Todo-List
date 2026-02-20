import { GoHome } from 'react-icons/go'
import { TbLockPassword } from 'react-icons/tb'

export const USER_ROUTES = [
  {
    title: 'หน้าแรก',
    route: '/dashboard',
    icon: <GoHome className="h-6 w-6" />,
  },
  {
    title: 'ตั้งค่า',
    route: '/dashboard/setting',
    icon: <TbLockPassword className="h-6 w-6" />,
  },
]
