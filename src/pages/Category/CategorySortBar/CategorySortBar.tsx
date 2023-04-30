import { HTMLAttributes, memo } from 'react'

import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'react-feather'

import { Button, DropdownMenu, MenuItem } from '@/components'
import { CATEGORY } from '@/constants'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import { OrderType, SortByType } from '@/types'

interface Props extends HTMLAttributes<HTMLDivElement> {
  order: OrderType
  sortBy: SortByType
  onSortBy: (sortByName: string, orderName?: OrderType) => void
}

const CategorySortBar = ({ sortBy, order, onSortBy, className }: Props) => {
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
                      onSortBy(type, itemType)
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
          <Button className={classNames('relative px-4 py-2')} onClick={() => onSortBy(type)}>
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
  )
}

export default memo(CategorySortBar)
