import { useCallback } from 'react'

import { Home, Search, ShoppingCart } from 'react-feather'
import { Link } from 'react-router-dom'

import {
  Button,
  DropdownMenu,
  EmptyCartIcon,
  INavItem,
  LogoIcon,
  MenuItem,
  NavItem,
  NavItemWithModal
} from '@/components'
import { AUTH, PATHS } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger, useAuthContext } from '@/contexts'
import { LEFT_NAV, RIGHT_NAV } from '@/data/header'

const fakeData = [
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  },
  {
    text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
    price: 1213213,
    to: PATHS.HOME_PATH
  }
]

const MainHeader = () => {
  const { accessToken, currentUser } = useAuthContext()

  const renderNav = useCallback(
    (data: INavItem[]) =>
      data.map(({ children, id, isVisible, text, menuItems, ...rest }) => {
        // isVisible === 'undefined' ==> Mặc định luôn show, item không cần check authentication
        if (typeof isVisible === 'undefined' || isVisible === !!accessToken) {
          return !menuItems ? (
            <NavItem key={id} {...rest} text={text}>
              {children}
            </NavItem>
          ) : (
            <NavItemWithModal
              key={id}
              {...rest}
              menuItems={menuItems}
              text={currentUser && text === AUTH.USER_INFO ? currentUser.name : text}
            />
          )
        }
      }),
    [accessToken, currentUser]
  )

  return (
    <header className="bg-gradient-to-b from-primary to-secondary px-4 py-2 text-white">
      {/* Navbar */}
      <nav className="mx-auto mb-2 flex max-w-6xl flex-row items-center justify-between overflow-hidden text-xs font-semibold max-sm:hidden">
        {/* Left Nav */}
        <ul className="flex divide-x divide-slate-400">{renderNav(LEFT_NAV)}</ul>
        {/* Right Nav */}
        <ul className="flex items-center divide-x divide-slate-400">{renderNav(RIGHT_NAV)}</ul>
      </nav>

      {/* Header with search */}
      <div className="mx-auto flex max-w-6xl flex-nowrap items-center justify-between gap-4 bg-transparent pt-2">
        {/* Logo */}
        <div className="self-start px-2 max-sm:self-center">
          <NavItem
            className="list-none"
            to={PATHS.HOME_PATH}
            leftIcon={
              <>
                <Home className="hidden max-sm:block" size={28} />
                <LogoIcon className="fill-white max-sm:hidden sm:h-14" />
              </>
            }
          />
        </div>
        {/* Search Container*/}
        <div className="w-full">
          {/* Search */}
          <div className="flex flex-nowrap gap-1 rounded-md bg-white max-sm:gap-0">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm tại đây"
              className="rounded-sm pl-4 pr-2 text-black focus:outline focus:outline-2 focus:outline-offset-4 max-sm:outline-none"
            />
            <span className="m-1 flex cursor-pointer items-center rounded-sm bg-primary px-2 py-1 text-white hover:opacity-90 md:px-6 md:py-2">
              <Search className="text-xs sm:text-2xl" size={16} />
            </span>
          </div>

          {/* Category */}
          <div className="mt-1 h-6 overflow-hidden max-sm:hidden">
            <ul className="flex flex-wrap justify-between text-xs text-gray-50">
              {/* Call api later */}
              <NavItem text="Dép Nam" className="py-1" />
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Tai Nghe</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Bluetooth</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Dép Quần</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Jean Nam</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Áo Khoác Nam</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Áo Khoác</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Áo Phông</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Giày Nam</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Áo Thun Nam</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Ốp iPhone</Link>
              </li>
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Áo Sơ Mi Nam</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Shopping cart */}
        <TooltipProvider placement="bottom-end" mainAxis={-4}>
          <TooltipTrigger asChild>
            <div className="flex-shrink-0 p-4 max-sm:translate-y-2 max-sm:p-2 max-sm:pb-4">
              <Link to={PATHS.CART_PATH} className="relative block -translate-x-1">
                <ShoppingCart className="cursor-pointer" size={28} />
                {/* Badge */}
                <div className="absolute -right-2/3 -top-1/3 h-fit min-w-fit overflow-hidden rounded-full border-2 border-primary bg-white px-1 text-center text-xs text-primary">
                  10
                  <sup>+</sup>
                </div>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <DropdownMenu title="Sản Phẩm Mới Thêm" className="min-w-[11rem] max-w-sm pt-2">
              {fakeData.length === 0 ? (
                <div className="w-full overflow-hidden px-2 py-14 text-center">
                  <EmptyCartIcon width="25rem" />
                  <p className="mt-4 p-2 text-sm text-gray-700">Chưa Có Sản Phẩm</p>
                </div>
              ) : (
                <>
                  {fakeData.map((props, index) => (
                    <MenuItem key={index} {...props} />
                  ))}
                  <div className="flex items-center justify-between p-2">
                    <p className="text-xs capitalize text-black/70">
                      2 sản phầm nữa trong giỏ hàng
                    </p>
                    <Button className="rounded-sm bg-primary px-4 py-2 text-white hover:opacity-90">
                      Xem giỏ hàng
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenu>
          </TooltipContent>
        </TooltipProvider>
      </div>
    </header>
  )
}

export default MainHeader
