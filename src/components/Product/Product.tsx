import { Rating, Star, type ItemStyles } from '@smastrom/react-rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { formatCurrency, formatNumber } from '@/utils'

interface Props {
  index: number
}

const customItemStyles: ItemStyles = {
  itemShapes: Star,
  itemStrokeWidth: 2,
  activeFillColor: '#ffb23f',
  activeStrokeColor: '#e17b21',
  inactiveFillColor: '#fff7ed',
  inactiveStrokeColor: '#e17b21'
}

const Product = ({ index }: Props) => {
  return (
    <Link to={'/'}>
      <section className="relative flex flex-col hover:-translate-y-1 transition ease-linear shadow-xl rounded-sm border border-transparent hover:border-primary h-auto">
        {/* Favorite Ribbon */}
        <div className="absolute z-20 max-w-[75%] bg-primary -translate-x-1 text-white text-xs px-1 top-2 rounded-r-sm">
          <div className="absolute z-20 left-0 bg-primary/90 w-1 h-1 triangle-top-right top-full"></div>
          <span className="h-full inline-block">Yêu thích</span>
        </div>
        {/* Ribbon voucher */}
        <div className="ribbon bg-yellow-300 absolute z-20 right-0 p-1">
          <span className="text-xs text-primary block text-center">48%</span>
          <span className="text-xs text-white block text-center mb-1 uppercase">Giảm</span>
        </div>
        {/* Overlay image */}
        <div className="absolute z-20 left-0 right-0 h-fit bg-transparent">
          <img
            src="https://res.cloudinary.com/dknvhah81/image/upload/v1682351189/category-banner/vn-50009109-191aec5513df34fbd150de9bb7aa884c_erbv4r.png"
            alt=""
            className="w-full"
          />
        </div>

        <div className="overflow-hidden bg-transparent">
          <img
            src={
              index % 2 === 0
                ? 'https://picsum.photos/id/0/367/267'
                : 'https://down-vn.img.susercontent.com/file/34969d7b8a92bcb5b6f6010669e5ca28_tn'
            }
            alt=""
            className="aspect-square w-full"
          />
        </div>
        <div className="flex flex-col p-2 gap-y-4">
          <p className="line-clamp-2 text-sm">
            Bộ 2 dây tay cách điệu, chất vải mềm mịn, phù hợp đi chơi đi biển, thời trang hot hè AO5
          </p>
          <div className="grid grid-cols-2 text-xs gap-y-2 place-content-stretch">
            {index % 2 === 0 && (
              <p
                className={classNames(
                  'text-sm line-clamp-1 text-black/[0.54] line-through break-words pr-2 w-full',
                  {
                    'col-span-2': index % 3 !== 0,
                    'col-span-1': index % 3 === 0
                  }
                )}>
                {formatCurrency(13000)}
              </p>
            )}
            {index % 3 === 0 && (
              <p
                className={classNames('text-sm line-clamp-1 text-primary break-words w-full', {
                  'col-span-2': index % 2 !== 0,
                  'col-span-1': index % 2 === 0
                })}>
                {formatCurrency(15212342121)}
              </p>
            )}
            <Rating readOnly value={4.52} itemStyles={customItemStyles} className="pr-6 h-full" />
            <p className="text-black/[0.54] line-clamp-1 whitespace-pre-wrap col-auto">
              Đã bán {formatNumber(99879194)}
            </p>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default Product
