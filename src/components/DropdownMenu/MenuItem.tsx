import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { useModalContext, useTooltipContext } from '@/contexts'
import { formatCurrency } from '@/utils'

import { DropItemMenu } from './type'

const MenuItem = ({
  hasPopup,
  to,
  text,
  image,
  price,
  className,
  heading,
  description,
  eventModal
}: DropItemMenu) => {
  const { setOpen } = useTooltipContext()

  const {
    setTrue,
    handleSetHeading,
    handleSetDescription,
    handleSetButtonText,
    handleSetEventType
  } = useModalContext()
  const handleToggle = () => {
    if (hasPopup) {
      setTrue()
      handleSetHeading(heading)
      handleSetDescription(description)
      handleSetButtonText(text)
      handleSetEventType(eventModal)
      setOpen(false)
    }
  }
  return (
    <>
      <li
        className={classNames('hover:bg-gray-200 hover:text-primary cursor-pointer', {
          [className ?? '']: className,
          'p-2': !to && !hasPopup
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
        ) : !hasPopup ? (
          <span className="block">{text}</span>
        ) : (
          <button className="p-2 w-full text-left" type="button" onClick={handleToggle}>
            {text}
          </button>
        )}
      </li>
    </>
  )
}

export default MenuItem
