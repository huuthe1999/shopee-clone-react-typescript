import { Link } from 'react-router-dom'

import { INavItem } from './type'

const NavItem = ({
  to,
  leftIcon,
  rightIcon,
  text,
  className,
  children
}: Omit<INavItem, 'menuItems'>) => {
  const content = (
    <>
      {leftIcon}
      {text}
      {rightIcon}
    </>
  )

  return (
    <li className={`px-2 ${className ?? ''}`}>
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
}

export default NavItem
