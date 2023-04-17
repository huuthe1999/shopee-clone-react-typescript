import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { useTooltipContext } from '@/contexts'
import { withModal, WithModalProps } from '@/hoc'
import { formatCurrency } from '@/utils'

import { DropItemMenu } from './type'

const MenuItem = ({
  to,
  text,
  image,
  price,
  className,
  setShowModal
}: Omit<DropItemMenu, 'hasPopup'> & WithModalProps) => {
  const { setOpen } = useTooltipContext()

  return (
    <>
      <li
        className={classNames('hover:bg-gray-200 hover:text-primary cursor-pointer', {
          [className ?? '']: className
        })}>
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
            className="w-full p-2 text-left"
            onClick={async () => {
              if (setShowModal) {
                setOpen(true)
                setShowModal(true)
              }
            }}>
            {text}
          </button>
        )}
      </li>
    </>
  )
}

export const MenuItemWithModal = withModal(MenuItem)
export default MenuItem
