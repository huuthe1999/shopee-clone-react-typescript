import { Link } from 'react-router-dom'

import voucherImg from '@/assets/images/vouchers.png'
import { Button } from '@/components'
import { ICart } from '@/types'
import { formatCurrency, formatNumber } from '@/utils'

import { CartQuantityRow } from './CartQuantityRow'
import { DropdownVoucher } from './DropdownVoucher'

interface CartTableRowProps {
  data: ICart
  onSelectProduct: (id: string) => void
}

export const CartTableRow = ({
  data: {
    _id,
    amount,
    product: {
      image,
      name,
      price,
      discount,
      quantity,
      categorySlug,
      slug: productSlug,
      _id: productId
    }
  },
  onSelectProduct
}: CartTableRowProps) => {
  return (
    <div className="flex gap-x-4 overflow-auto rounded-sm px-5 py-4 text-sm text-zinc-500 shadow">
      <div className="flex basis-1/2 items-center gap-x-2">
        {/* Checkbox */}
        <input
          type="checkbox"
          // checked={isSelect}
          // onChange={(e) => {
          //   onSelect(id.toString(), e.target.checked)
          // }}
          id={`select-all`}
          name={`select-all`}
          className={
            'h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded border-gray-300 px-2 text-primary accent-primary'
          }
        />

        <Link to={`/${categorySlug}/${productSlug}-${productId}`}>
          <img
            src={image}
            alt="product_img_cart"
            className="aspect-square h-fit w-20"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = '/images/default-image-product.png'
            }}
          />
        </Link>

        <div className="flex-grow text-black/80">
          <Link to={`/${categorySlug}/${productSlug}-${productId}`} className="mb-1 line-clamp-2">
            {name}
          </Link>
          <img src={voucherImg} alt="vouchers_img" className="h-5" />
        </div>

        <div className="flex shrink-0 flex-col gap-y-1">
          <DropdownVoucher />
        </div>
      </div>

      <div className="flex basis-1/2 flex-nowrap items-center gap-x-2 text-center">
        <div className="gap-x flex basis-1/4 flex-col">
          {discount > 0 && (
            <span className="line-clamp-1 w-full break-all text-sm text-black/[0.54] line-through">
              {formatCurrency(price)}
            </span>
          )}
          <span className="line-clamp-1 w-full break-all text-sm text-black/[0.87]">
            {formatCurrency((price * (100 - discount)) / 100)}
          </span>
        </div>
        <div className="basis-1/4">
          <CartQuantityRow value={amount.toString()} quantity={quantity} />
          <div className="mt-1 line-clamp-2 text-xs italic text-black/[0.54]">
            Còn {formatNumber(quantity)} sản phẩm
          </div>
        </div>
        <div className="basis-1/4">
          <span className="line-clamp-1 w-full break-words text-sm text-primary">
            {formatCurrency((price * (100 - discount) * amount) / 100)}
          </span>
        </div>
        <div className="basis-1/4">
          <Button
            className="rounded-sm bg-primary px-4 py-2 text-white transition hover:opacity-80"
            onClick={() => {
              onSelectProduct(_id)
            }}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  )
}
