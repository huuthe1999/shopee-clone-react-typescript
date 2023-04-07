import { useMemo } from 'react'

import { Home, Search, ShoppingCart } from 'react-feather'
import { Link } from 'react-router-dom'

import { LogoIcon, NavItem, NavItemDropDown } from '@/components'
import { PATHS } from '@/constants'
import { LEFT_NAV, RIGHT_NAV } from '@/data/header'
const MainHeader = () => {
  const renderLeftNav = useMemo(
    () =>
      LEFT_NAV.map(({ children, ...rest }, index) => {
        return (
          <NavItem key={index} {...rest}>
            {children}
          </NavItem>
        )
      }),
    []
  )

  const renderRightNav = useMemo(
    () =>
      RIGHT_NAV.map(({ children, menuItems, ...rest }, index) => {
        return menuItems ? (
          <NavItemDropDown key={index} menuItems={menuItems} {...rest}>
            {children}
          </NavItemDropDown>
        ) : (
          <NavItem key={index} {...rest}>
            {children}
          </NavItem>
        )
      }),
    []
  )

  return (
    <header className="py-2 px-4 bg-gradient-to-b from-primary to-secondary text-white">
      {/* Navbar */}
      <nav className="mx-auto max-w-6xl flex flex-row items-center justify-between text-xs font-semibold mb-2 overflow-hidden">
        {/* Left Nav */}
        <ul className="flex divide-x divide-slate-400 ">{renderLeftNav}</ul>
        {/* Right Nav */}
        <ul className="flex divide-x divide-slate-400 items-center">
          {renderRightNav}
          {/* <NavItem
            to={PATHS.HOME_PATH}
            text="Tiếng việt"
            leftIcon={<Globe size={16} />}
            rightIcon={<ChevronDown size={16} />}
          />
          <NavItem
            className="cursor-pointer"
            text="gamecaro"
            leftIcon={
              <div className="w-5 h-5 rounded-full overflow-hidden bg-[url('https://down-vn.img.susercontent.com/file/mx-11134226-23020-6nbhtbltvynvfb_tn')] bg-no-repeat bg-center bg-contain" />
            }
          /> */}
        </ul>
      </nav>

      {/* Header with search */}
      <div className="mx-auto max-w-6xl bg-transparent py-2 flex flex-nowrap gap-4 justify-between items-center">
        {/* Logo */}
        <div className="px-2 self-start max-sm:self-center">
          <Link to={PATHS.HOME_PATH}>
            <Home className="max-sm:block hidden" size={28} />
            <LogoIcon className="sm:h-14 max-sm:h-8 fill-white max-sm:hidden" />
          </Link>
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
              <li className="px-2 py-1">
                <Link to={PATHS.HOME_PATH}>Dép Nam</Link>
              </li>
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
        <div className="flex-shrink-0 p-4 max-sm:p-2">
          <Link to={PATHS.CART_PATH}>
            <ShoppingCart className="cursor-pointer" size={28} />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default MainHeader
