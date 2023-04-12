import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { formatCurrency } from '@/utils'

import { DropItemMenu } from './type'

const MenuItem = ({ to, text, image, price }: DropItemMenu) => {
  return (
    <li
      className={classNames('p-2 hover:bg-gray-200 hover:text-primary cursor-pointer', {
        'hover:text-teal-500': to && !(image || price)
      })}>
      {to ? (
        <Link to={to} className="flex flex-nowrap justify-between gap-2">
          {image && (
            <div className="flex-shrink-0 w-10 h-10 overflow-hidden">
              <img src={image} alt="Ảnh sản phẩm" />
            </div>
          )}
          <div className="flex-1 flex flex-nowrap overflow-hidden">
            <p className="basis-4/6 line-clamp-1 h-fit">{text}</p>
            {price && (
              <div className="basis-1/6 text-right ml-10 text-primary">{formatCurrency(price)}</div>
            )}
          </div>
        </Link>
      ) : (
        <span className="block">{text}</span>
      )}
    </li>
  )
}

export default MenuItem
