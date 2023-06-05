import { Rating, Star, type ItemStyles } from '@smastrom/react-rating'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { IProduct } from '@/types'
import { formatCurrency, formatNumber } from '@/utils'

const LinkMotion = motion(Link)
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
  image,
  vouchers,
  categorySlug,
  slug,
  discount,
  name,
  price,
  rating,
  sold,
  shopType,
  province: { name: provinceName }
}: Omit<IProduct, 'images'>) => {
  return (
    <LinkMotion
      key={_id}
      layout
      to={`/${categorySlug}/${slug}-${_id}`}
      transition={{ type: 'tween' }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}>
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
        <div className="relative min-h-[50%] w-full overflow-hidden bg-transparent">
          <img
            src={image}
            alt={slug}
            className="aspect-square w-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/default-image-product.png'
            }}
          />
          {/* Overlay image */}
          <img
            src="/images/overlay-image-product.png"
            alt=""
            className="absolute inset-0 z-10 bg-transparent object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-2">
          <p className="line-clamp-2 text-sm">{name}</p>
          <div className="mt-2 flex flex-col gap-y-2">
            {/* Vouchers */}
            <div className="flex min-h-[1rem] flex-wrap items-center gap-x-2">
              {vouchers.map((voucher) => {
                return (
                  <span
                    key={voucher._id}
                    className={classNames(
                      'box block rounded px-2.5 py-0.5 text-xxs font-medium capitalize',
                      {
                        'bg-red-100 text-red-700': shopType === 1,
                        'bg-primary text-white': shopType !== 1
                      }
                    )}>
                    Giảm{' '}
                    {voucher.type === 0
                      ? voucher.discount.percent + ' %'
                      : formatCurrency(voucher.discount.price)}
                  </span>
                )
              })}
            </div>
            <div className="inline-flex gap-x-2">
              {/*Original Price */}
              {discount > 0 && (
                <span
                  className={classNames(
                    'line-clamp-1 w-full break-words text-sm text-black/[0.54] line-through'
                  )}>
                  {formatCurrency(price)}
                </span>
              )}
              {/* Discount Price */}
              <span className={classNames('line-clamp-1 w-full break-words text-sm text-primary')}>
                {formatCurrency((price * (100 - discount)) / 100)}
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
    </LinkMotion>
  )
}

export default Product
