import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { DropdownMenu } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'

import { INavItem } from './type'

const NavItemDropDown = ({
  to,
  leftIcon,
  rightIcon,
  text,
  className,
  children,
  menuItems
}: INavItem) => {
  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  )

  return (
    <>
      {/* <li className={`px-2 ${className ?? ''}`} ref={refs.setReference} {...getReferenceProps()}>
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
      <FloatingPortal>
        {menuItems && isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              tabIndex={-1}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content'
              }}
              {...getFloatingProps()}>
              <DropdownMenu data={menuItems} />
              <FloatingArrow ref={arrowRef} context={context} />
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal> */}

      <TooltipProvider placement="bottom">
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent>{menuItems && <DropdownMenu data={menuItems} />}</TooltipContent>
      </TooltipProvider>
    </>
  )
}

export default NavItemDropDown
