import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string
}

const CardBanner = ({ image }: Props) => {
  return (
    <div className="h-full">
      <img
        className="h-full w-full"
        src={image}
        alt=""
        onError={(e) => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/images/default-image-product.png'
        }}
      />
    </div>
  )
}

export default CardBanner
