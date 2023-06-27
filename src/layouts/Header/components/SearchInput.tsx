import { Dispatch, FormEvent, forwardRef } from 'react'

import classNames from 'classnames'
import { Search } from 'react-feather'
import { useMatch, useNavigate } from 'react-router-dom'

import { Button, DropdownMenu, MenuItem } from '@/components'
import { AUTH, BRIEF_CART_SIZE, PATHS } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import { useBoolean, useProductsQuery } from '@/hooks'
import { authUtils } from '@/utils'

import { OverLaySearch } from './mobile/OverLaySearch'
interface Props {
  onSearch: (e: FormEvent<HTMLFormElement>) => void
  value: string
  deferredQuery: string
  setValue: Dispatch<React.SetStateAction<string>>
  className: string
}

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ onSearch, setValue, value, deferredQuery, className }, ref) => {
    const matchHomePath = useMatch(PATHS.HOME_PATH)
    const { value: open, toggle, setTrue, setFalse } = useBoolean()
    const history: string[] | null = authUtils.getItem(AUTH.SEARCH_HISTORY)
    const navigate = useNavigate()
    const { data: searchProductsQuery } = useProductsQuery({
      size: BRIEF_CART_SIZE,
      type: 'search',
      enabled: Boolean(deferredQuery),
      keyword: deferredQuery
    })

    const searchProducts = searchProductsQuery?.data.data

    return (
      <div className={className}>
        {/* Search */}
        <form
          className={classNames(
            'flex flex-nowrap gap-1 rounded-md bg-white max-sm:flex-row-reverse max-sm:gap-0',
            {
              'max-sm:bg-neutral-100': !matchHomePath
            }
          )}
          onSubmit={onSearch}>
          <TooltipProvider
            placement="bottom"
            noArrowRef
            mainAxis={8}
            matchRefWidth
            click
            keepOpen={false}
            open={open}
            onOpenChange={toggle}>
            <TooltipTrigger asChild onClick={setTrue}>
              <input
                ref={ref}
                value={value}
                onChange={(e) => {
                  setTrue()
                  setValue(e.target.value)
                }}
                type="text"
                placeholder="Tìm kiếm sản phẩm tại đây"
                className="rounded-sm bg-transparent pl-4 pr-2 text-black focus:outline focus:outline-2 focus:outline-offset-4 max-sm:py-2 max-sm:pl-1 max-sm:outline-none max-sm:placeholder:text-primary"
              />
            </TooltipTrigger>
            <TooltipContent
              className={classNames('z-[9998] max-sm:!w-full max-sm:!max-w-full', {
                '!hidden': !deferredQuery && !history
              })}>
              {/* Show on mobile device */}
              <OverLaySearch onClose={setFalse} open={open}>
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
              </OverLaySearch>

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
            className="m-1 flex cursor-pointer items-center rounded-sm bg-primary px-2 py-1 text-white hover:opacity-90 max-sm:pointer-events-none max-sm:bg-transparent max-sm:text-black/40 md:px-6 md:py-2"
            type="submit">
            <Search className="text-xs sm:text-2xl" size={16} />
          </Button>
        </form>
      </div>
    )
  }
)
