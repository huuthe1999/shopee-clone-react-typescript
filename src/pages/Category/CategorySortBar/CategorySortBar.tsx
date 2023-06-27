import { HTMLAttributes, useCallback } from 'react'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Code
} from 'react-feather'
import { useSearchParams } from 'react-router-dom'

import { Button, DropdownMenu, ForwardButton, MenuItem } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import { ORDER_LIST, SORT_BY_LIST } from '@/data/category'
import { OrderType, SortByType } from '@/types'
import { formatSearchParamUrl } from '@/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  pageCount: number
}

const CategorySortBar = ({ pageCount, className }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page'))
  const order: OrderType = (searchParams.get('order') as OrderType) || ''
  const sortBy: SortByType = (searchParams.get('sortBy') as SortByType) || 'popular'

  const handleSetSortBy = useCallback(
    (sortByName: SortByType, orderName?: OrderType) => {
      const newParamsObject = formatSearchParamUrl({
        searchParams,
        params: [
          { name: 'sortBy', value: sortByName },
          { name: 'order', value: orderName ?? '' },
          { name: 'page', value: 0 }
        ]
      })

      setSearchParams(newParamsObject)
    },
    [setSearchParams, searchParams]
  )

  const handleSetNextPage = () => {
    const newParamsObject = formatSearchParamUrl({
      searchParams,
      params: [{ name: 'page', value: page + 1 }]
    })

    setSearchParams(newParamsObject)
  }

  const handleSetPrevPage = () => {
    const newParamsObject = formatSearchParamUrl({
      searchParams,
      params: [{ name: 'page', value: page - 1 }]
    })

    setSearchParams(newParamsObject)
  }

  const renderSortBar = SORT_BY_LIST.map(({ text, type, isDropdown }) => {
    return (
      <li
        className={classNames('cursor-pointer rounded-md bg-white text-neutral-600 transition', {
          'text-white': sortBy === type,
          // 'hover:opacity-80': sortBy !== type,
          'max-sm:flex-grow': isDropdown
        })}
        key={type}>
        {isDropdown ? (
          <div className="relative">
            <TooltipProvider
              placement="bottom-end"
              noArrowRef
              mainAxis={2}
              matchRefWidth
              click={false}>
              <TooltipTrigger asChild>
                <ForwardButton
                  className={classNames(
                    'relative z-10 flex min-w-[12.5rem] flex-nowrap items-stretch justify-between rounded-md px-4 py-2 max-sm:hidden'
                  )}>
                  <span>
                    {text.vi}
                    {Boolean(order) &&
                      `: ${ORDER_LIST.find(({ type }) => type === order)?.text.vi}`}
                  </span>
                  <span className="my-auto shrink-0">
                    <ChevronDown size={16} />
                  </span>
                </ForwardButton>
              </TooltipTrigger>
              <TooltipContent>
                <DropdownMenu className="py-2">
                  {ORDER_LIST.map(({ text: itemText, type: itemType }) => (
                    <MenuItem
                      key={itemText.vi}
                      text={itemText.vi}
                      onClick={() => {
                        order === itemType && sortBy === type
                          ? undefined
                          : handleSetSortBy(type as SortByType, itemType)
                      }}
                      rightButtonIcon={
                        order === itemType &&
                        sortBy === type && <Check className="text-primary" size={16} />
                      }
                      buttonClassName={
                        order === itemType && sortBy === type ? 'cursor-not-allowed' : ''
                      }
                    />
                  ))}
                </DropdownMenu>
              </TooltipContent>
            </TooltipProvider>
            {/* Button order on mobile */}
            <Button
              className={classNames(
                'relative z-10 flex w-full flex-nowrap items-center justify-center gap-x-2 rounded-md px-4 py-2 sm:hidden',
                {
                  'text-white !opacity-100': sortBy === type
                }
              )}
              style={{
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={() => {
                const newOrder = order === 'asc' ? 'desc' : 'asc'
                handleSetSortBy(type as SortByType, newOrder)
              }}>
              <span>{text.vi}</span>
              {order === '' && <Code className="h-3 w-3 rotate-90 text-inherit sm:hidden" />}
              {order === 'asc' && <ArrowUp className="h-4 w-4 text-inherit sm:hidden" />}
              {order === 'desc' && <ArrowDown className="h-4 w-4 text-inherit sm:hidden" />}
            </Button>
            {sortBy === type && (
              <motion.span
                className="absolute inset-0 rounded-md bg-primary"
                layoutId="underline"
                // style={{ borderRadius: 9999 }}
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6
                }}
              />
            )}
          </div>
        ) : (
          <Button
            disabled={sortBy === type}
            className={classNames('relative rounded-md px-4 py-2', {
              '!opacity-100': sortBy === type
            })}
            style={{
              WebkitTapHighlightColor: 'transparent'
            }}
            onClick={() => handleSetSortBy(type as SortByType)}>
            {sortBy === type && (
              <motion.span
                className="absolute inset-0 rounded-md bg-primary"
                layoutId="underline"
                // style={{ borderRadius: 9999 }}
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6
                }}
              />
            )}
            <span className="relative z-10">{text.vi}</span>
          </Button>
        )}
      </li>
    )
  })

  return (
    <div
      className={classNames(
        'flex flex-nowrap items-center justify-between gap-x-2 bg-black/[0.03] px-5 py-3 text-sm max-sm:sticky max-sm:left-0 max-sm:top-[50px] max-sm:z-[60] max-sm:bg-white max-sm:p-2',
        [className]
      )}>
      {/* Sort bar */}
      <div className="flex w-full items-center gap-x-2">
        <span className="max-sm:hidden">Sắp xếp theo</span>
        <ul className="flex flex-1 shrink flex-nowrap gap-2 text-center">{renderSortBar}</ul>
      </div>
      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-end gap-2 self-stretch max-sm:hidden">
          <p className="my-auto flex flex-nowrap px-2">
            <span className="line-clamp-1 text-primary">{page + 1}</span>
            <span className="line-clamp-1">/{pageCount}</span>
          </p>

          <Button
            className="h-full border border-neutral-400 bg-white px-3 text-center"
            disabled={page === 0}
            onClick={handleSetPrevPage}>
            <ChevronLeft size={16} />
          </Button>
          <Button
            className="h-full border border-neutral-400 bg-white px-3 text-center"
            disabled={page === pageCount - 1}
            onClick={handleSetNextPage}>
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategorySortBar
