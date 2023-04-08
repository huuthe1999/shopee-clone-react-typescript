import { Bell, ChevronDown, Facebook, Globe, HelpCircle, Instagram } from 'react-feather'
import { Link } from 'react-router-dom'

import { INavItem } from '@/components/NavItem'
import { PATHS } from '@/constants'

export const LEFT_NAV: INavItem[] = [
  {
    to: PATHS.HOME_PATH,
    text: 'Kênh Người Bán'
  },
  {
    to: PATHS.HOME_PATH,
    text: 'Tải ứng dụng'
  },
  {
    to: PATHS.HOME_PATH,
    text: 'Kết nối'
  },
  {
    className: 'flex gap-2',
    children: (
      <>
        <Link to={PATHS.HOME_PATH}>
          <Facebook size={16} />
        </Link>
        <Link to={PATHS.HOME_PATH}>
          <Instagram size={16} />
        </Link>
      </>
    )
  }
]

export const RIGHT_NAV: INavItem[] = [
  {
    to: PATHS.HOME_PATH,
    text: 'Thông báo',
    leftIcon: <Bell size={16} />
  },
  {
    to: PATHS.HOME_PATH,
    text: 'Hỗ trợ',
    leftIcon: <HelpCircle size={16} />
  },
  {
    menuItems: [{ text: 'Tiếng việt' }, { text: 'English' }],
    text: 'Tiếng việt',
    leftIcon: <Globe size={16} />,
    rightIcon: <ChevronDown size={16} />
  },
  {
    menuItems: [
      { text: 'Profile', to: PATHS.HOME_PATH },
      { text: 'Log out', to: PATHS.HOME_PATH }
    ],
    text: 'gamecaro',
    leftIcon: (
      <div className="w-5 h-5 rounded-full overflow-hidden bg-[url('https://down-vn.img.susercontent.com/file/mx-11134226-23020-6nbhtbltvynvfb_tn')] bg-no-repeat bg-center bg-contain" />
    )
  }
]
