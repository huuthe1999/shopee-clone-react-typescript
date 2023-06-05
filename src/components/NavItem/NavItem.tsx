import classNames from 'classnames'
import { Link, useLocation } from 'react-router-dom'

import { PATHS } from '@/constants'

import { INavItem } from './type'

const NavItem = ({
  to,
  leftIcon,
  rightIcon,
  text,
  className,
  children
}: Omit<INavItem, 'id' | 'menuItems'>) => {
  const { pathname, search } = useLocation()

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
        <Link
          className="flex w-fit gap-1 hover:text-neutral-200"
          to={
            to === PATHS.HOME_PATH || pathname === PATHS.HOME_PATH
              ? to
              : { pathname: to, search: `${search}&callback=${pathname}` }
          }>
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

  return renderElement
}

export default NavItem
