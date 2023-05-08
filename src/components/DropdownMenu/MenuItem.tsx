import classNames from 'classnames'
import { Link } from 'react-router-dom'

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
      <li className={classNames('hover:bg-gray-200 hover:text-primary', [className])}>
        {to ? (
          <Link to={to} className="p-2 flex flex-nowrap justify-between gap-2">
            {image && (
              <div className="flex-shrink-0 w-10 h-10 overflow-hidden">
                <img src={image} alt="Ảnh sản phẩm" />
              </div>
            )}
            <div className="flex-1 flex flex-nowrap overflow-hidden">
              <p className="basis-4/6 line-clamp-1 h-fit">{text}</p>
              {price && (
                <div className="basis-1/6 text-right ml-10 text-primary">
                  {formatCurrency(price)}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <button
            className={classNames('w-full p-2 text-left flex items-center gap-2', [
              buttonClassName
            ])}
            onClick={onClick}>
            {leftButtonIcon}
            <span className="flex-1">{text}</span>
            {rightButtonIcon}
          </button>
        )}
      </li>
    </>
  )
}

// export const MenuItemWithModal = withModal(MenuItem)
export default MenuItem
