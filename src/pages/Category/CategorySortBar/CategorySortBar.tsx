import { HTMLAttributes, memo, useCallback } from 'react'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'
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
        className={classNames('rounded-md cursor-pointer text-neutral-600 transition', {
          'text-white': sortBy === type,
          'hover:opacity-80': sortBy !== type
        })}
        key={type}>
        {isDropdown ? (
          <TooltipProvider
            placement="bottom-end"
            noArrowRef
            mainAxis={2}
            matchRefWidth
            click={false}>
            <TooltipTrigger asChild>
              <ForwardButton
                className={classNames('relative px-4 py-2 flex flex-nowrap items-stretch')}>
                {sortBy === type && (
                  <motion.div
                    className="absolute bg-primary inset-0 rounded-md"
                    layoutId="underline"
                    // style={{ borderRadius: 9999 }}
                    transition={{
                      type: 'tween',
                      duration: 0.4
                    }}
                  />
                )}
                <span className="relative z-10 pr-16">{text.vi}</span>
                <span className="relative z-10 my-auto shrink-0">
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
                      order === itemType && sortBy === type ? 'text-primary cursor-not-allowed' : ''
                    }
                  />
                ))}
              </DropdownMenu>
            </TooltipContent>
          </TooltipProvider>
        ) : (
          <Button
            disabled={sortBy === type}
            className={classNames('relative px-4 py-2', { '!opacity-100': sortBy === type })}
            onClick={() => handleSetSortBy(type as SortByType)}>
            {sortBy === type && (
              <motion.div
                className="absolute bg-primary inset-0 rounded-md"
                layoutId="underline"
                // style={{ borderRadius: 9999 }}
                transition={{
                  type: 'tween',
                  duration: 0.4
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
        'flex flex-nowrap justify-between items-center py-3 px-5 text-sm gap-x-2 bg-black/[0.03]',
        [className]
      )}>
      {/* Sort bar */}
      <div className="flex items-center gap-x-2">
        <span>Sắp xếp theo</span>
        <ul className="flex flex-nowrap text-center gap-2 shrink">{renderSortBar}</ul>
      </div>
      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-end gap-2 self-stretch">
          <p className="flex flex-nowrap my-auto px-2">
            <span className="text-primary line-clamp-1">{page + 1}</span>
            <span className="line-clamp-1">/{pageCount}</span>
          </p>

          <Button
            className="px-3 text-center h-full"
            disabled={page === 0}
            onClick={handleSetPrevPage}>
            <ChevronLeft size={16} />
          </Button>
          <Button
            className="px-3 text-center h-full"
            disabled={page === pageCount - 1}
            onClick={handleSetNextPage}>
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  )
}

export default memo(CategorySortBar)
