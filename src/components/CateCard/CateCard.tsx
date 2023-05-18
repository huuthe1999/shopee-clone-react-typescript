import { Link } from 'react-router-dom'

import { PATHS } from '@/constants'

interface CateCardProps {
  image: string
  name: string
  link?: string
}
const CateCard = ({ image, name, link = PATHS.HOME_PATH }: CateCardProps) => {
  return (
    <Link to={link}>
      <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1">
        <div className="mx-6 mb-0 mt-4 aspect-square overflow-hidden">
          <img src={image} alt="" className="block overflow-hidden rounded-2xl p-4" />
        </div>

        <div className="mb-2 overflow-hidden">
          <p className="line-clamp-2 h-fit text-center text-xs">{name}</p>
        </div>
      </div>
    </Link>
  )
}

export default CateCard
