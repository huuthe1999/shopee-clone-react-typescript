import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
import { Home, Search, ShoppingCart } from 'react-feather'
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
import { useDebounce, useOrderQuery, useProductsQuery, useProfileQuery } from '@/hooks'
import { authUtils, saveSearchHistory } from '@/utils'

const MainHeader = () => {
  const { accessToken } = useAuthContext()
  const { data, isFetching, isRefetching } = useProfileQuery()
  const [query, setQuery] = useState('')
  const deferredQuery = useDebounce(query.trim())
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams] = useSearchParams()

  const navigate = useNavigate()
  const matchCartPath = useMatch(PATHS.CART_PATH)
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

  const { data: searchProductsQuery } = useProductsQuery({
    size: BRIEF_CART_SIZE,
    type: 'search',
    enabled: Boolean(deferredQuery),
    keyword: deferredQuery
  })

  const searchProducts = searchProductsQuery?.data.data

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

  const history: string[] | null = authUtils.getItem(AUTH.SEARCH_HISTORY)

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
        <ol
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
          <div className="flex-1">
            {/* Search */}
            <form
              className="flex flex-nowrap gap-1 rounded-md bg-white max-sm:gap-0"
              onSubmit={handleSearch}>
              <TooltipProvider
                placement="bottom-end"
                noArrowRef
                mainAxis={8}
                matchRefWidth
                click
                keepOpen={false}>
                <TooltipTrigger asChild>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Tìm kiếm sản phẩm tại đây"
                    className="rounded-sm pl-4 pr-2 text-black focus:outline focus:outline-2 focus:outline-offset-4 max-sm:outline-none"
                  />
                </TooltipTrigger>
                <TooltipContent className={classNames({ hidden: !deferredQuery && !history })}>
                  <DropdownMenu className="py-2">
                    {!deferredQuery && history ? (
                      <>
                        {history.map((item) => (
                          <MenuItem
                            key={item}
                            text={item}
                            onClick={() => {
                              navigate({
                                pathname: PATHS.SEARCH_PATH,
                                search: `?keyword=${item}`
                              })
                            }}
                          />
                        ))}
                      </>
                    ) : deferredQuery && searchProducts?.items.length === 0 ? (
                      <MenuItem
                        text={
                          <>
                            Không tìm thấy sản phẩm nào cho từ khóa{' '}
                            <span className="italic text-primary">&quot;{deferredQuery}&quot;</span>
                          </>
                        }
                        buttonClassName="cursor-default"
                        className="hover:bg-transparent hover:text-inherit"
                      />
                    ) : (
                      deferredQuery && (
                        <>
                          {searchProducts?.items.map(
                            ({ image, name, _id, categorySlug, slug, categoryId }) => (
                              <MenuItem
                                key={_id}
                                text={name}
                                image={image}
                                to={`/${categorySlug}-${categoryId}/${slug}-${_id}`}
                              />
                            )
                          )}
                        </>
                      )
                    )}
                  </DropdownMenu>
                </TooltipContent>
              </TooltipProvider>
              <Button
                className="m-1 flex cursor-pointer items-center rounded-sm bg-primary px-2 py-1 text-white hover:opacity-90 md:px-6 md:py-2"
                type="submit">
                <Search className="text-xs sm:text-2xl" size={16} />
              </Button>
            </form>
          </div>
        )}
        {/* Shopping cart */}
        {!match && (
          <TooltipProvider placement="bottom-end" mainAxis={-4} keepOpen={false}>
            <TooltipTrigger asChild>
              <div className="flex-shrink-0 p-4 max-sm:translate-y-2 max-sm:p-2 max-sm:pb-4">
                <Link to={PATHS.CART_PATH} className="relative block -translate-x-1">
                  <ShoppingCart className="cursor-pointer" size={28} />
                  {/* Badge */}
                  {productsCartData?.totalItems ? (
                    <div className="absolute -right-1/3 -top-1/3 h-fit min-w-fit overflow-hidden rounded-full border-2 border-primary bg-white px-1 text-center text-xs text-primary">
                      {isProductsCartRefetching ? (
                        <LoadingIcon className="fill-primary text-gray-200" />
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
                        to={`/${product.categorySlug}-${product.categoryId}/${product.slug}-${product._id}`}
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
