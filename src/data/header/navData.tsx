import { Bell, ChevronDown, Facebook, Globe, HelpCircle, Instagram } from 'react-feather'
import { Link } from 'react-router-dom'

import { INavItem } from '@/components'
import { AUTH, EVENT_MODALS, PATHS } from '@/constants'

export const LEFT_NAV: INavItem[] = [
  {
    id: 1,
    to: PATHS.HOME_PATH,
    text: 'Kênh Người Bán'
  },
  {
    id: 2,
    to: PATHS.HOME_PATH,
    text: 'Tải ứng dụng'
  },
  {
    id: 3,
    to: PATHS.HOME_PATH,
    text: 'Kết nối'
  },
  {
    id: 4,
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
    id: 1,
    to: PATHS.HOME_PATH,
    text: 'Thông báo',
    leftIcon: <Bell size={16} />
  },
  {
    id: 2,
    to: PATHS.HOME_PATH,
    text: 'Hỗ trợ',
    leftIcon: <HelpCircle size={16} />
  },
  {
    id: 3,
    menuItems: [{ text: 'Tiếng việt' }, { text: 'English' }],
    text: 'Tiếng việt',
    leftIcon: <Globe size={16} />,
    rightIcon: <ChevronDown size={16} />
  },
  {
    id: 4,
    to: PATHS.LOGIN_PATH,
    text: 'Đăng nhập',
    isVisible: false //Ẩn khi unauthenticated(khi chưa có access token)
  },
  {
    id: 5,
    to: PATHS.REGISTER_PATH,
    text: 'Đăng kí',
    isVisible: false //Ẩn khi unauthenticated(khi chưa có access token)
  },
  {
    id: 6,
    menuItems: [
      { text: 'Cá nhân', to: PATHS.USER_PROFILE_PATH, className: 'hover:text-teal-500' },
      {
        text: 'Đăng xuất',
        className: 'hover:text-teal-500',
        hasPopup: true,
        heading: 'Đăng xuất',
        buttonText: 'Đăng xuất',
        description: 'Bạn có muốn đăng xuất không ?',
        eventModal: EVENT_MODALS.LOGOUT_EVENT
      }
    ],
    isVisible: true, //Show khi authenticated(khi có access token)
    text: AUTH.USER_INFO, //Condition to show username
    leftIcon: (
      <div className="h-5 w-5 overflow-hidden rounded-full bg-[url('https://down-vn.img.susercontent.com/file/mx-11134226-23020-6nbhtbltvynvfb_tn')] bg-contain bg-center bg-no-repeat" />
    ),
    rightIcon: <ChevronDown size={16} />
  }
]
