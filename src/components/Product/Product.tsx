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

const Product = ({ slug, discount, images, name, price, rating, viewed }: IProduct) => {
  return (
    <Link to={slug}>
      <section className="my-1 relative flex flex-col hover:-translate-y-[2px] transition ease-linear shadow-xl rounded-sm border border-transparent hover:border-primary hover:shadow-md h-full">
        {/* Favorite Ribbon */}
        <div className="absolute z-10 max-w-[75%] bg-primary -translate-x-1 text-white text-xs px-1 top-2 rounded-r-sm">
          <div className="absolute z-10 left-0 bg-primary/90 w-1 h-1 triangle-top-right top-full"></div>
          <span className="h-full inline-block">Yêu thích</span>
        </div>
        {/* Ribbon voucher */}
        {discount > 0 && (
          <div className="ribbon bg-yellow-300 absolute z-10 right-0 p-1">
            <span className="text-xs text-primary block text-center">{discount}%</span>
            <span className="text-xs text-white block text-center mb-1 uppercase">Giảm</span>
          </div>
        )}

        {/* Image */}
        <div className="relative overflow-hidden bg-transparent w-fit">
          <img src={images[0]} alt="" className="aspect-square w-full" loading="lazy" />
          {/* Overlay image */}
          <div className="absolute z-10 inset-0 bg-transparent">
            <img
              src="https://res.cloudinary.com/dknvhah81/image/upload/v1682351189/category-banner/vn-50009109-191aec5513df34fbd150de9bb7aa884c_erbv4r.png"
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col p-2 justify-between flex-1">
          <p className="line-clamp-2 text-sm">
            {viewed} - {name}
          </p>
          <div className="mt-3 flex flex-col gap-y-2">
            <div className="inline-flex gap-x-2">
              {/* Discount */}
              {discount > 0 && (
                <span
                  className={classNames(
                    'text-sm line-clamp-1 text-black/[0.54] line-through break-words w-full'
                  )}>
                  {formatCurrency((price * (100 - discount)) / 100)}
                </span>
              )}
              {/* Price */}
              <span className={classNames('text-sm line-clamp-1 break-words text-primary w-full')}>
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
              <p className="text-xs text-black/[0.54] line-clamp-1 whitespace-pre-wrap col-auto">
                Đã bán {formatNumber(99879194)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default Product
