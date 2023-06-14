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
          <Link to={to} className="flex flex-nowrap justify-between gap-2 p-2">
            {image && (
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden">
                <img src={image} alt="Ảnh sản phẩm" />
              </div>
            )}
            <div className="flex flex-1 flex-nowrap overflow-hidden">
              <p
                className={classNames('line-clamp-1 h-fit', {
                  'basis-full': !price,
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
          </Link>
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
