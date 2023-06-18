import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { formatCurrency } from '@/utils'

import { MenuItemProps } from './type'

const MenuItem = ({
  to,
  text,
  image,
  price,
  className,
  leftButtonIcon,
  rightButtonIcon,
  buttonClassName,
  onClick
}: MenuItemProps) => {
  return (
    <>
      <li
        className={classNames('transition-colors hover:bg-gray-200 hover:text-primary', [
          className
        ])}>
        {to ? (
          <NavLink
            to={to}
            end
            className={({ isActive }) =>
              classNames('flex flex-nowrap justify-between gap-2 p-2', {
                'text-primary': isActive
              })
            }>
            {image && (
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden">
                <img src={image} alt="Ảnh sản phẩm" />
              </div>
            )}
            <div className="flex flex-1 flex-nowrap items-center overflow-hidden">
              {leftButtonIcon}
              <p
                className={classNames('line-clamp-1 h-fit', {
                  'my-auto basis-full self-stretch': !price,
                  'basis-4/6': price
                })}>
                {text}
              </p>
              {price && (
                <div className="ml-10 basis-1/6 text-right text-primary">
                  {formatCurrency(price)}
                </div>
              )}
            </div>
          </NavLink>
        ) : (
          <button
            type="button"
            className={classNames('flex w-full gap-2 p-2 text-left', [buttonClassName])}
            onClick={onClick}>
            {image && (
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden">
                <img
                  src={image}
                  alt="Ảnh sản phẩm"
                  className="aspect-square w-full bg-transparent"
                />
              </div>
            )}
            {leftButtonIcon}
            <span className="line-clamp-2 flex-1">{text}</span>
            {rightButtonIcon}
            {price && (
              <div className="line-clamp-1 basis-2/6 break-words text-right text-primary">
                {formatCurrency(price)}
              </div>
            )}
          </button>
        )}
      </li>
    </>
  )
}

// export const MenuItemWithModal = withModal(MenuItem)
export default MenuItem
