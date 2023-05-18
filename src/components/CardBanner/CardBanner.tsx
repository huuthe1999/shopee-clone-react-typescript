import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  image: string
}

const CardBanner = ({ image }: Props) => {
  return (
    <div className="h-full">
      <img className="h-full w-full" src={image} alt="" loading="lazy" />
    </div>
  )
}

export default CardBanner
