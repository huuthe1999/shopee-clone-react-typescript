import { Truck } from 'react-feather'

import { ICartCompleted } from '@/types'
import { formatCurrency } from '@/utils'

const UserPurchaseRow = ({
  voucher,
  address,
  amount,
  totalPrice,
  product: { image, name, discount, price, province },
  updatedAt
}: ICartCompleted) => {
  const date = new Date(updatedAt)
  return (
    <div className="flex flex-col gap-y-1 divide-y divide-gray-200 overflow-auto rounded-sm bg-white px-5 py-4 text-sm text-zinc-500 shadow">
      <div className="flex flex-nowrap items-stretch justify-between text-sm text-teal-500">
        <span className="line-clamp-1 break-all">Gửi từ {province.name}</span>
        <div className="flex flex-nowrap items-stretch justify-end gap-x-1">
          <Truck className="inline-block" size={18} />
          Đơn hàng được đặt lúc {date.toLocaleDateString()}, {date.toLocaleTimeString()}
        </div>
      </div>
      <div className="flex gap-x-4 py-2">
        <div className="flex w-full flex-nowrap items-center gap-x-2">
          {/* Image */}
          <span className="aspect-square w-20 shrink-0 overflow-hidden border border-gray-200">
            <img
              className="h-full w-full"
              src={image}
              alt="product_img_cart"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = '/images/default-image-product.png'
              }}
            />
          </span>
          {/* Content*/}
          <div className="flex-grow text-black/80">
            <span className="mb-1 line-clamp-2 text-sm md:text-lg">{name}</span>
            <span>x{amount}</span>
            <span className="line-clamp-1 break-all italic text-black/50">Gửi đến {address}</span>
          </div>
          {/* Price */}
          <div className="flex shrink-0 flex-col flex-nowrap items-end justify-center gap-2">
            <div className="flex flex-nowrap gap-x-2">
              {discount > 0 && (
                <span className="w-full text-sm text-black/[0.26] line-through">
                  {formatCurrency(price)}
                </span>
              )}
              <span className="w-full text-sm text-primary">
                {formatCurrency((price * (100 - discount)) / 100)}
              </span>
            </div>
            {voucher && (
              <span className="box w-fit rounded bg-primary px-2 py-0.5 text-center text-xs uppercase text-white">
                {voucher}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Summary */}
      <div className="text-md py-2 text-right text-black/[0.8]">
        Thành tiền:
        <span className="text-md ml-2 text-primary md:text-xl">{formatCurrency(totalPrice)}</span>
      </div>
    </div>
  )
}

export default UserPurchaseRow
