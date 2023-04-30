import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import { INavItem } from './type'

const NavItem = ({
  to,
  leftIcon,
  rightIcon,
  text,
  className,
  children
}: Omit<INavItem, 'id' | 'menuItems'>) => {
  const location = useLocation()

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
        <Link className="flex gap-1 hover:text-neutral-200" to={to} state={{ from: location }}>
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

  return renderElement
}

export default NavItem
