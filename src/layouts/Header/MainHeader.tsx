import { FormEvent, useCallback, useEffect, useRef } from 'react'

import classNames from 'classnames'
import { Home, Search, ShoppingCart } from 'react-feather'
import { Link, useMatch, useNavigate, useSearchParams } from 'react-router-dom'

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
import { AUTH, BRIEF_CART_SIZE, PATHS } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger, useAuthContext } from '@/contexts'
import { LEFT_NAV, RIGHT_NAV } from '@/data/header'
import { useOrderQuery } from '@/hooks'

const MainHeader = () => {
  const { accessToken, currentUser } = useAuthContext()
  const [searchParams] = useSearchParams()

  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const match = useMatch(PATHS.CART_PATH)

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

  const { data: productsCartQueryData, isRefetching: isProductsCartRefetching } = useOrderQuery({
    status: -1,
    size: BRIEF_CART_SIZE
  })
  const productsCartData = productsCartQueryData?.data.data

  useEffect(() => {
    const searchKeyword = searchParams.get('keyword')
    if (inputRef.current) {
      inputRef.current.value = searchKeyword || ''
    }
  }, [searchParams])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = inputRef.current?.value
    if (value?.trim()) {
      navigate({ pathname: PATHS.SEARCH_PATH, search: `?keyword=${value.trim()}` })
    }
  }

  return (
    <header className="bg-gradient-to-b from-primary to-secondary px-4 pb-4 pt-2 text-white">
      {/* Navbar */}
      <nav className="mx-auto mb-2 flex max-w-6xl flex-row items-center justify-between overflow-hidden text-xs font-semibold max-sm:hidden">
        {/* Left Nav */}
        <ul className="flex divide-x divide-slate-400">{renderNav(LEFT_NAV)}</ul>
        {/* Right Nav */}
        <ul className="flex items-center divide-x divide-slate-400">{renderNav(RIGHT_NAV)}</ul>
      </nav>

      {/* Header with search */}
      <div
        className={classNames(
          'mx-auto flex max-w-6xl flex-nowrap justify-between gap-4 bg-transparent pt-2',
          {
            'items-center': !match,
            'items-end': match
          }
        )}>
        {/* Logo */}
        <div
          className={classNames('shrink-0 self-start max-sm:self-center', {
            'flex-1': match
          })}>
          <NavItem
            className="list-none"
            to={PATHS.HOME_PATH}
            leftIcon={
              <div className="flex items-end text-white">
                <Home className="hidden max-sm:block" size={28} />
                <LogoIcon className="fill-white max-sm:hidden sm:h-12" />
                {match && (
                  <span className="ml-4 border-l-2 border-l-white pl-4 text-2xl">Giỏ Hàng</span>
                )}
              </div>
            }
          />
        </div>
        {/* Search Container*/}
        <div className="flex-1">
          {/* Search */}
          <form
            className="flex flex-nowrap gap-1 rounded-md bg-white max-sm:gap-0"
            onSubmit={handleSearch}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm sản phẩm tại đây"
              className="rounded-sm pl-4 pr-2 text-black focus:outline focus:outline-2 focus:outline-offset-4 max-sm:outline-none"
            />
            <Button
              className="m-1 flex cursor-pointer items-center rounded-sm bg-primary px-2 py-1 text-white hover:opacity-90 md:px-6 md:py-2"
              type="submit">
              <Search className="text-xs sm:text-2xl" size={16} />
            </Button>
          </form>
        </div>
        {/* Shopping cart */}
        {!match && (
          <TooltipProvider placement="bottom-end" mainAxis={-4}>
            <TooltipTrigger asChild>
              <div className="flex-shrink-0 p-4 max-sm:translate-y-2 max-sm:p-2 max-sm:pb-4">
                <Link to={PATHS.CART_PATH} className="relative block -translate-x-1">
                  <ShoppingCart className="cursor-pointer" size={28} />
                  {/* Badge */}
                  {productsCartData?.totalItems ? (
                    <div className="absolute -right-1/3 -top-1/3 h-fit min-w-fit overflow-hidden rounded-full border-2 border-primary bg-white px-1 text-center text-xs text-primary">
                      {isProductsCartRefetching ? (
                        <svg
                          aria-hidden="true"
                          className="inline h-4 w-4 animate-spin fill-primary text-gray-200"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        <>
                          {productsCartData?.totalItems &&
                            Math.min(productsCartData?.totalItems, 10)}
                          {productsCartData?.totalItems && productsCartData?.totalItems > 10 && (
                            <sup>+</sup>
                          )}
                        </>
                      )}
                    </div>
                  ) : null}
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <DropdownMenu
                title={
                  productsCartData?.items && productsCartData?.items.length > 0
                    ? 'Sản Phẩm Mới Thêm'
                    : undefined
                }
                className="min-w-[11rem] max-w-sm pt-2">
                {!productsCartData || productsCartData?.items.length === 0 ? (
                  <div className="w-full overflow-hidden px-2 py-14 text-center">
                    <EmptyCartIcon width="25rem" />
                    <p className="mt-4 p-2 text-sm text-gray-700">Chưa Có Sản Phẩm</p>
                  </div>
                ) : (
                  <>
                    {productsCartData?.items.map(({ product, _id }) => (
                      <MenuItem
                        key={_id}
                        text={product.name}
                        image={product.image}
                        price={
                          product.discount
                            ? (product.price * (100 - product.discount)) / 100
                            : product.price
                        }
                        buttonClassName="cursor-default"
                      />
                    ))}
                    <div className="flex items-center justify-between p-2">
                      {productsCartData?.totalItems &&
                        productsCartData?.totalItems > BRIEF_CART_SIZE && (
                          <p className="text-xs capitalize text-black/70">
                            {productsCartData?.totalItems - BRIEF_CART_SIZE} sản phầm nữa trong giỏ
                            hàng
                          </p>
                        )}
                      <Button
                        className="ml-auto rounded-sm bg-primary px-4 py-2 text-white hover:opacity-90"
                        onClick={() => {
                          navigate(PATHS.CART_PATH)
                        }}>
                        Xem giỏ hàng
                      </Button>
                    </div>
                  </>
                )}
              </DropdownMenu>
            </TooltipContent>
          </TooltipProvider>
        )}
      </div>
    </header>
  )
}

export default MainHeader
