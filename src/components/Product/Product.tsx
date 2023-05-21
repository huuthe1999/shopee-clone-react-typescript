import { Rating, Star, type ItemStyles } from '@smastrom/react-rating'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { IProduct } from '@/types'
import { formatCurrency, formatNumber } from '@/utils'

export const customItemStyles: ItemStyles = {
  itemShapes: Star,
  itemStrokeWidth: 2,
  activeFillColor: '#ffb23f',
  activeStrokeColor: '#e17b21',
  inactiveFillColor: '#fff7ed',
  inactiveStrokeColor: '#e17b21'
}

const Product = ({
  _id,
  categorySlug,
  slug,
  discount,
  images,
  name,
  price,
  rating,
  sold,
  shopType,
  province: { name: provinceName }
}: IProduct) => {
  return (
    <Link to={`/${categorySlug}/${slug}-${_id}`}>
      <section className="relative my-1 flex h-full flex-col rounded-sm border border-transparent shadow-xl transition ease-linear hover:-translate-y-[2px] hover:border-primary hover:shadow-md">
        {/* Favorite Ribbon */}
        {shopType === 2 && (
          <div className="absolute top-2 z-10 max-w-[75%] -translate-x-1 rounded-r-sm bg-primary px-1 text-xs text-white">
            <div className="triangle-top-right absolute left-0 top-full z-10 h-1 w-1 bg-primary/90"></div>
            <span className="inline-block h-full">Yêu thích</span>
          </div>
        )}

        {/* Mall Ribbon */}
        {shopType === 1 && (
          <div className="absolute top-2 z-10 max-w-[75%] -translate-x-1 rounded-r-sm bg-red-700 px-1 text-xs text-white">
            <div className="triangle-top-right absolute left-0 top-full z-10 h-1 w-1 bg-red-700"></div>
            <span className="inline-block h-full">Mall</span>
          </div>
        )}

        {/* Ribbon voucher */}
        {discount > 0 && (
          <div className="ribbon absolute right-0 z-10 bg-yellow-300 p-1">
            <span className="block text-center text-xs text-primary">{discount}%</span>
            <span className="mb-1 block text-center text-xs uppercase text-white">Giảm</span>
          </div>
        )}

        {/* Image */}
        <div className="relative w-fit overflow-hidden bg-transparent">
          <img
            src={images[0].url}
            alt={slug}
            className="aspect-square w-full"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/default-image-product.png'
            }}
          />
          {/* Overlay image */}
          <div className="absolute inset-0 z-10 bg-transparent">
            <img src="/images/overlay-image-product.png" alt="" className="w-full object-cover" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between p-2">
          <p className="line-clamp-2 text-sm">{name}</p>
          <div className="mt-3 flex flex-col gap-y-2">
            <div className="inline-flex gap-x-2">
              {/* Discount */}
              {discount > 0 && (
                <span
                  className={classNames(
                    'line-clamp-1 w-full break-words text-sm text-black/[0.54] line-through'
                  )}>
                  {formatCurrency((price * (100 - discount)) / 100)}
                </span>
              )}
              {/* Price */}
              <span className={classNames('line-clamp-1 w-full break-words text-sm text-primary')}>
                {formatCurrency(price)}
              </span>
            </div>
            <div className="flex gap-x-4">
              <Rating
                readOnly
                value={rating}
                itemStyles={customItemStyles}
                className="h-full max-w-[40%] pr-2"
              />
              <p className="col-auto line-clamp-1 whitespace-pre-wrap text-xs text-black/[0.54]">
                Đã bán {formatNumber(sold)}
              </p>
            </div>
            {/* Location */}
            <p className="col-span-full mt-2 line-clamp-1 text-xs text-black/[0.65]">
              {provinceName}
            </p>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default Product
