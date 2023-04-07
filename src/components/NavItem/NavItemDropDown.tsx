import { useRef, useState } from 'react'

import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  safePolygon,
  shift,
  useFloating,
  useHover,
  useInteractions
} from '@floating-ui/react'
import { Link } from 'react-router-dom'

import DropdownMenu from '@/components/DropdownMenu'

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
  const arrowRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const { x, y, strategy, refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
    middleware: [
      offset(10),
      flip(),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const hover = useHover(context, {
    handleClose: safePolygon({
      restMs: 500,
      blockPointerEvents: true
    })
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  )

  return (
    <>
      <li className={`px-2 ${className ?? ''}`} ref={refs.setReference} {...getReferenceProps()}>
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
      </FloatingPortal>
    </>
  )
}

export default NavItemDropDown
