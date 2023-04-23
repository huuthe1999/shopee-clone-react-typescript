import { HTMLAttributes, memo } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  index?: number
}

const CardBanner = (props: Props) => {
  return (
    <div
      className="bg-emerald-400 h-full"
      // className={classNames('w-full h-full', {
      //   [className ?? '']: className
      // })}
    >
      <img
        className="w-full h-full"
        src="https://cf.shopee.vn/file/vn-50009109-20403322e7815abc6066c9d181fe6797_xxhdpi"
        alt=""
      />
    </div>
  )
}

export default memo(CardBanner)
