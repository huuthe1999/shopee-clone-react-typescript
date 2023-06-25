import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { ArrowLeft, Home, ShoppingCart, User } from 'react-feather'
import { Link, useMatch, useNavigate, useSearchParams } from 'react-router-dom'

import {
  Avatar,
  Button,
  DropdownMenu,
  EmptyCartIcon,
  INavItem,
  LoadingIcon,
  LogoIcon,
  MenuItem,
  NavItem,
  NavItemWithModal
} from '@/components'
import { AUTH, BRIEF_CART_SIZE, PATHS, QUERY_KEYS } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger, useAuthContext } from '@/contexts'
import { LEFT_NAV, RIGHT_NAV } from '@/data/header'
import { useDebounce, useOrderQuery, useProfileQuery } from '@/hooks'
import { saveSearchHistory } from '@/utils'

import { SearchInput } from './components'

const MainHeader = () => {
  const { accessToken } = useAuthContext()
  const { data, isFetching, isRefetching } = useProfileQuery()
  const [query, setQuery] = useState('')
  const deferredQuery = useDebounce(query.trim())
  const inputRef = useRef<HTMLInputElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const matchCartPath = useMatch(PATHS.CART_PATH)
  const matchHomePath = useMatch(PATHS.HOME_PATH)
  const matchCheckOutPath = useMatch(PATHS.CHECKOUT_PATH)

  const profile = data?.data.data
  const match = matchCartPath || matchCheckOutPath

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
              leftIcon={
                text === AUTH.USER_INFO ? (
                  <Avatar
                    key={profile?.avatar}
                    letter={profile?.name[0]}
                    className="h-5 w-5"
                    image={profile?.avatar}
                    isLoading={isFetching || isRefetching}
                  />
                ) : (
                  rest.leftIcon
                )
              }
              menuItems={menuItems}
              text={profile && text === AUTH.USER_INFO ? profile.name : text}
            />
          )
        }
      }),
    [accessToken, profile, isFetching, isRefetching]
  )

  const {
    data: productsCartQueryData,
    isRefetching: isProductsCartRefetching,
    isPreviousData: isPreviousCartQueryData
  } = useOrderQuery({
    status: -1,
    enabled: !match,
    size: BRIEF_CART_SIZE,
    key: QUERY_KEYS.order.briefList
  })

  const productsCartData = isPreviousCartQueryData ? undefined : productsCartQueryData?.data.data

  useEffect(() => {
    const searchKeyword = searchParams.get('keyword')
    if (searchKeyword && searchKeyword.trim()) {
      setQuery(searchKeyword)
    } else {
      setQuery('')
    }
  }, [searchParams])

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    inputRef?.current?.blur()
    if (query.trim()) {
      saveSearchHistory(query.trim())
      navigate({ pathname: PATHS.SEARCH_PATH, search: `?keyword=${query.trim()}` })
    }
  }

  const renderCart = (
    <div className="flex-shrink-0 p-4 max-sm:px-1 max-sm:py-2">
      <Link to={PATHS.CART_PATH} className="relative m-auto block">
        <ShoppingCart className="h-7 w-7 cursor-pointer max-sm:h-6 max-sm:w-6" />
        {/* Badge */}
        {productsCartData?.totalItems ? (
          <div className="absolute -right-1/3 -top-1/3 h-fit min-w-fit overflow-hidden rounded-full border-2 border-primary bg-white px-1 text-center text-xs text-primary max-sm:border-white max-sm:bg-primary max-sm:text-white">
            {isProductsCartRefetching ? (
              <LoadingIcon className="fill-primary text-gray-200" />
            ) : (
              <>
                {productsCartData?.totalItems && Math.min(productsCartData?.totalItems, 10)}
                {productsCartData?.totalItems && productsCartData?.totalItems > 10 && <sup>+</sup>}
              </>
            )}
          </div>
        ) : null}
      </Link>
    </div>
  )

  return (
    <>
      {/* Header on mobile device */}
      <header
        className={classNames(
          'sticky top-0 z-[100] hidden flex-nowrap items-center gap-x-2 bg-white p-2 shadow-sm',
          {
            'max-sm:flex': !matchHomePath
          }
        )}>
        <ArrowLeft
          className="mx-2 my-1 h-7 w-7 shrink-0 text-primary"
          onClick={() => {
            navigate(-1)
          }}
        />
        <p className="line-clamp-1 break-all">
          {matchCartPath && 'Giỏ Hàng'}
          {matchCheckOutPath && 'Thanh Toán'}
        </p>
      </header>
      <header
        ref={headerRef}
        className={classNames(
          'bg-gradient-to-b from-primary to-secondary px-4 pb-4 pt-2 text-white max-sm:absolute max-sm:z-20 max-sm:w-full max-sm:bg-none max-sm:p-2',
          {
            'max-sm:hidden': !matchHomePath
          }
        )}>
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
            'mx-auto flex max-w-6xl flex-nowrap justify-between gap-4 bg-transparent pt-2 max-sm:gap-2 max-sm:pt-0',
            {
              'items-center': !match,
              'items-end': match
            }
          )}>
          {/* Logo */}
          <ol
            className={classNames('shrink-0 self-start max-sm:hidden', {
              'flex-1': match
            })}>
            <NavItem
              className="list-none max-sm:hidden"
              to={PATHS.HOME_PATH}
              leftIcon={
                <div className="flex items-end text-white">
                  <Home className="hidden max-sm:block" size={28} />
                  <LogoIcon className="fill-white max-sm:hidden sm:h-12" />
                  {matchCartPath && (
                    <span className="ml-4 border-l-2 border-l-white pl-4 text-2xl">Giỏ Hàng</span>
                  )}
                  {matchCheckOutPath && (
                    <span className="ml-4 border-l-2 border-l-white pl-4 text-2xl">Thanh Toán</span>
                  )}
                </div>
              }
            />
          </ol>
          {/* Search Container*/}
          {!matchCheckOutPath && (
            <SearchInput
              className="flex-1"
              onSearch={handleSearch}
              value={query}
              deferredQuery={deferredQuery}
              setValue={setQuery}
            />
          )}
          {/* Shopping cart on mobile*/}
          {!match && <div className="hidden max-sm:block">{renderCart}</div>}
          {/* Shopping cart */}
          {!match && (
            <TooltipProvider placement="bottom-end" keepOpen={false}>
              <TooltipTrigger asChild className="block p-2 max-sm:hidden">
                {renderCart}
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
                          to={`/${product.categorySlug}-${product.categoryId}/${product.slug}-${product._id}`}
                        />
                      ))}
                      <div className="flex items-center justify-between p-2">
                        {productsCartData?.totalItems &&
                          productsCartData?.totalItems > BRIEF_CART_SIZE && (
                            <p className="text-xs capitalize text-black/70">
                              {productsCartData?.totalItems - BRIEF_CART_SIZE} sản phầm nữa trong
                              giỏ hàng
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

          {/* User feature on mobile */}
          <div className="hidden flex-shrink-0 max-sm:block max-sm:px-1 max-sm:py-2">
            {profile ? (
              <Avatar
                className="h-6 w-6"
                image={profile.avatar}
                isLoading={isFetching || isRefetching}
              />
            ) : (
              <Link to={PATHS.CART_PATH} className="relative m-auto block">
                <User className="h-6 w-6 cursor-pointer" />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default MainHeader
