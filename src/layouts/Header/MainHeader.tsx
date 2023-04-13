import { Fragment, useCallback } from 'react'

import { Home, Search, ShoppingCart } from 'react-feather'
import { Link } from 'react-router-dom'

import { Button, DropdownMenu, INavItem, LogoIcon, NavItem } from '@/components'
import { PATHS } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger, useAuthContext } from '@/contexts'
import { LEFT_NAV, RIGHT_NAV } from '@/data/header'

const MainHeader = () => {
  const { accessToken } = useAuthContext()

  const renderNav = useCallback(
    (data: INavItem[]) =>
      data.slice(0, data.length - 1).map(({ children, id, isVisible, ...rest }) => {
        return (
          // isVisible === 'undefined' ==> Mặc định luôn show
          (typeof isVisible === 'undefined' || isVisible === !!accessToken) && (
            <Fragment key={id}>
              <NavItem {...rest}>{children}</NavItem>
            </Fragment>
          )
        )
      }),
    [accessToken]
  )

  return (
    <header className="py-2 px-4 bg-gradient-to-b from-primary to-secondary text-white">
      {/* Navbar */}
      <nav className="max-sm:hidden mx-auto max-w-6xl flex flex-row items-center justify-between text-xs font-semibold mb-2 overflow-hidden">
        {/* Left Nav */}
        <ul className="flex divide-x divide-slate-400 ">{renderNav(LEFT_NAV)}</ul>
        {/* Right Nav */}
        <ul className="flex divide-x divide-slate-400 items-center">
          {renderNav(RIGHT_NAV)}
          {/* <NavItem
            to={PATHS.HOME_PATH}
            text="Tiếng việt"
            leftIcon={<Globe size={16} />}
            rightIcon={<ChevronDown size={16} />}
          /> */}
          {!!accessToken && (
            <TooltipProvider placement="bottom-end">
              <TooltipTrigger>
                <li className="px-2 cursor-pointer">
                  <span className="flex gap-1 hover:text-neutral-200 items-center">
                    {RIGHT_NAV[RIGHT_NAV.length - 1].leftIcon}
                    {RIGHT_NAV[RIGHT_NAV.length - 1].text}
                  </span>
                </li>
              </TooltipTrigger>
              <TooltipContent>
                <DropdownMenu data={RIGHT_NAV[RIGHT_NAV.length - 1].menuItems!} />
              </TooltipContent>
            </TooltipProvider>
          )}
        </ul>
      </nav>

      {/* Header with search */}
      <div className="mx-auto max-w-6xl bg-transparent py-2 flex flex-nowrap gap-4 justify-between items-center">
        {/* Logo */}
        <div className="px-2 self-start max-sm:self-center">
          <NavItem
            className="list-none"
            to={PATHS.HOME_PATH}
            leftIcon={
              <>
                <Home className="max-sm:block hidden" size={28} />
                <LogoIcon className="sm:h-14 fill-white max-sm:hidden" />
              </>
            }
          />
        </div>
        {/* Search Container*/}
        <div className="w-full">
          {/* Search */}
          <div className="bg-white rounded-md flex flex-nowrap gap-1 max-sm:gap-0">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm tại đây"
              className="pl-4 pr-2 rounded-sm text-black max-sm:outline-none focus:outline focus:outline-2 focus:outline-offset-4 "
            />
            <span className="bg-primary p-1 sm:p-3 m-1 rounded-sm cursor-pointer flex items-center text-white hover:opacity-90">
              <Search className="text-xs sm:text-2xl" />
            </span>
          </div>

          {/* Category */}
          <div className="max-sm:hidden overflow-hidden h-6 mt-1">
            <ul className="flex flex-wrap justify-between text-sm text-gray-50">
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
            <div className="flex-shrink-0 p-4 max-sm:p-2">
              <Link to={PATHS.CART_PATH} className="block -translate-x-1 relative">
                <ShoppingCart className="cursor-pointer" size={28} />
                {/* Badge */}
                <div className="absolute -right-2/3 -top-1/3 bg-white h-fit min-w-fit rounded-full border-primary border-2 text-primary text-xs text-center px-1 overflow-hidden">
                  10
                  <sup>+</sup>
                </div>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <DropdownMenu
              data={[
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                },
                {
                  text: 'dqwjdqwd dkmqlmdqd qdklqkd,dq dqkdq',
                  image:
                    'https://down-vn.img.susercontent.com/file/sg-11134201-23010-zdi4iyf1ramva8_tn',
                  price: 1213213,
                  to: PATHS.HOME_PATH
                }
              ]}
              title="Sản Phẩm Mới Thêm"
              footer={<Button text="Xem giỏ hàng" />}
            />
          </TooltipContent>
        </TooltipProvider>
      </div>
    </header>
  )
}

export default MainHeader
