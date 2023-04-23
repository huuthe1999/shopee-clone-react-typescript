import { Link } from 'react-router-dom'

import { CateCardBanner } from '@/types/banner.response'

const CateCard = ({ image, text }: CateCardBanner) => {
  return (
    <Link to={'/'}>
      <div className="flex flex-col justify-center items-center hover:-translate-y-1 transition-transform">
        <div className="overflow-hidden aspect-square mb-0 mt-4 mx-6">
          <img src={image} alt="" className="block overflow-hidden rounded-2xl p-4" />
        </div>

        <div className="overflow-hidden mb-2">
          <p className="line-clamp-2 h-fit text-center text-xs">{text}</p>
        </div>
      </div>
    </Link>
  )
}

export default CateCard
