import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { DropdownMenu } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'

import { INavItem } from './type'

const NavItem = ({
  to,
  leftIcon,
  rightIcon,
  text,
  className,
  children,
  menuItems
}: Omit<INavItem, 'id'>) => {
  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  )

  const renderElement = (
    <li
      className={classNames('px-2', {
        [className ?? '']: className
      })}>
      {to ? (
        <Link className="flex gap-1 hover:text-neutral-200" to={to}>
          {content}
        </Link>
      ) : children ? (
        <>{children}</>
      ) : (
        <span className="flex gap-1 hover:text-neutral-200 items-center cursor-pointer">
          {content}
        </span>
      )}
    </li>
  )

  return !menuItems ? (
    renderElement
  ) : (
    <TooltipProvider placement="bottom-end">
      <TooltipTrigger asChild>{renderElement}</TooltipTrigger>
      <TooltipContent>
        <DropdownMenu data={menuItems} />
      </TooltipContent>
    </TooltipProvider>
  )
}

export default NavItem
