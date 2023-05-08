import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string
}

const CardBanner = ({ image }: Props) => {
  return (
    <div className="h-full">
      <img className="w-full h-full" src={image} alt="" loading="lazy" />
    </div>
  )
}

export default CardBanner
