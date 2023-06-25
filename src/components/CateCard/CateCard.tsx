import { Link } from 'react-router-dom'

import { PATHS } from '@/constants'

interface CateCardProps {
  image: string
  name: string
  link?: string
}
const CateCard = ({ image, name, link = PATHS.HOME_PATH }: CateCardProps) => {
  return (
    <Link to={link} className="h-full w-full">
      <div className="m-auto flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
        <div className="h-full w-full shrink-0 overflow-hidden rounded-2xl px-2 md:px-4 lg:px-6">
          <img
            src={image}
            alt="banner-img"
            className="aspect-square w-full lg:p-2"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/default-image-product.png'
            }}
          />
        </div>

        <p className="my-2 line-clamp-2 h-fit shrink-0 whitespace-pre-line break-words text-center text-xs">
          {name}
        </p>
      </div>
    </Link>
  )
}

export default CateCard
