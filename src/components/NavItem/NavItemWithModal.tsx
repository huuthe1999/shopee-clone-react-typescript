import { useMemo } from 'react'

import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { DropdownMenu, MenuItem, MenuItemWithModal } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'

import { INavItem } from './type'

const NavItemWithModal = ({
  menuItems,
  to,
  leftIcon,
  rightIcon,
  text,
  className,
  children
}: Omit<INavItem, 'id'>) => {
  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  )

  const renderElement = (
    <li className={classNames('px-2', [className])}>
      {to ? (
        <Link className="flex gap-1 hover:text-neutral-200" to={to}>
          {content}
        </Link>
      ) : children ? (
        <>{children}</>
      ) : (
        <span className="flex cursor-pointer items-center gap-1 hover:text-neutral-200">
          {content}
        </span>
      )}
    </li>
  )

  const childHasPopup = useMemo(() => menuItems?.some((item) => item.hasPopup), [menuItems])

  return (
    <TooltipProvider placement="bottom-end" click={childHasPopup}>
      <TooltipTrigger asChild>{renderElement}</TooltipTrigger>
      <TooltipContent>
        <DropdownMenu className="min-w-[11rem] max-w-sm pt-2">
          {menuItems?.map((props, index) => {
            return !props.hasPopup ? (
              <MenuItem key={index} {...props} />
            ) : (
              <MenuItemWithModal key={index} {...props} />
            )
          })}
        </DropdownMenu>
      </TooltipContent>
    </TooltipProvider>
  )
}

export default NavItemWithModal
