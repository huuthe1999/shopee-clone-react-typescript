import { useCallback, useRef, useState } from 'react'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Check, ChevronDown, ChevronLeft, ChevronRight, Filter } from 'react-feather'

import { Button, CateSection, DropdownMenu, MenuItem, PingIcon, ProductList } from '@/components'
import { CATEGORY } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import { OrderType, SortByType } from '@/types'

interface Props {}

const CategoryPage = (props: Props) => {
  // Calculate height of filter side
  const ref = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<OrderType>('asc')
  const [sortBy, setSortBy] = useState<SortByType>('popular')

  const handleSetSortBy = useCallback((sortByName: string, orderName?: OrderType) => {
    setSortBy(sortByName as SortByType)
    if (orderName) {
      setOrder(orderName)
    }
  }, [])

  const renderSortBar = CATEGORY.SORT_BY_LIST.map(({ text, type, isDropdown }) => {
    return (
      <li
        className={classNames('rounded-md cursor-pointer text-neutral-600 transition', {
          'text-white': sortBy === type,
          'hover:opacity-80': sortBy !== type
        })}
        key={type}>
        {isDropdown ? (
          <TooltipProvider placement="bottom-end" noArrowRef mainAxis={2} matchRefWidth>
            <TooltipTrigger asChild>
              <div className="relative flex flex-nowrap items-stretch min-w-[12.5rem] max-w-xs h-full px-2">
                <span className="relative z-10 text-left my-auto line-clamp-1 flex-1">
                  {text.vi}
                </span>
                <span className="relative z-10 my-auto shrink-0">
                  <ChevronDown size={16} />
                </span>
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
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <DropdownMenu className="py-2">
                {CATEGORY.ORDER_LIST.map(({ text: itemText, type: itemType }) => (
                  <MenuItem
                    key={itemText.vi}
                    text={itemText.vi}
                    onClick={() => {
                      handleSetSortBy(type, itemType)
                    }}
                    rightButtonIcon={
                      order === itemType &&
                      sortBy === type && <Check className="text-primary" size={16} />
                    }
                    buttonClassName={order === itemType && sortBy === type ? 'text-primary' : ''}
                  />
                ))}
              </DropdownMenu>
            </TooltipContent>
          </TooltipProvider>
        ) : (
          <Button
            className={classNames('relative px-4 py-2')}
            onClick={() => handleSetSortBy(type)}>
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
    <div className="max-w-6xl mx-auto h-full">
      <div className="flex my-16 gap-x-4" ref={ref}>
        {/* Filter side */}
        <div
          className="basis-1/6 flex flex-col gap-y-2"
          style={{ height: ref.current?.clientHeight + 'px' }}>
          {/* Header name */}
          <div className="flex gap-x-2 py-2 pt-5">
            <span className="relative">
              <PingIcon />
              <Filter size={16} />
            </span>

            <h2 className="font-bold">BỘ LỌC TÌM KIẾM</h2>
          </div>
          {[...Array(4)].map((cateSection, index) => (
            <CateSection key={index} />
          ))}
        </div>
        {/* Product list */}
        <div className="basis-5/6">
          <ProductList
            listClassName="grid-cols-5"
            sortBar={
              <div className="flex flex-nowrap justify-between items-center py-3 px-5 text-sm gap-x-2 bg-black/[0.03]">
                {/* Sort bar */}
                <span>Sắp xếp theo</span>
                <div className="flex-1 shrink-0">
                  <ul className="flex flex-nowrap text-center gap-x-2">{renderSortBar}</ul>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-end gap-2 self-stretch">
                  <p className="flex flex-nowrap my-auto px-2">
                    <span className="text-primary line-clamp-1">1</span>
                    <span className="line-clamp-1">/9</span>
                  </p>

                  <Button className="px-3 text-center h-full" disabled>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button className="px-3 text-center h-full">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
