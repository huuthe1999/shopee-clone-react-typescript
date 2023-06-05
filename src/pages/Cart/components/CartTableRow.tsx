import { memo, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import voucherImg from '@/assets/images/vouchers.png'
import { Button } from '@/components'
import { ProductSelected } from '@/pages/Cart/Cart'
import { ICart, TVoucher } from '@/types'
import { formatCurrency, formatNumber } from '@/utils'

import { CartQuantityRow } from './CartQuantityRow'
import { DropdownVoucher } from './DropdownVoucher'
interface CartTableRowProps extends ICart {
  onDeleteProduct: (id: string) => void
  onCheck: (check: boolean, product: ProductSelected) => void
  isCheck: boolean
}

export const CartTableRow = memo(
  ({
    _id,
    isCheck,
    amount,
    product: {
      isActive,
      image,
      name,
      price,
      discount,
      quantity,
      categorySlug,
      slug: productSlug,
      vouchers,
      _id: productId
    },
    onDeleteProduct,
    onCheck
  }: CartTableRowProps) => {
    const [voucherSelected, setVoucherSelected] = useState<TVoucher>()

    const totalPriceItem = useMemo(() => {
      let totalPrice = (price * (100 - discount) * amount) / 100
      if (voucherSelected) {
        if (voucherSelected.type === 0) {
          totalPrice = (totalPrice * (100 - voucherSelected.discount.percent)) / 100
        } else {
          totalPrice = totalPrice - voucherSelected.discount.price
        }
      }
      return totalPrice
    }, [voucherSelected, discount, price, amount])

    const isInValidOrder = !isActive || !quantity

    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheck(e.target.checked, { _id, totalPriceItem })
    }

    const handleSetVoucher = (value?: TVoucher) => {
      setVoucherSelected(value)
      // Recalculate totalPriceItem

      let totalPrice = (price * (100 - discount) * amount) / 100
      if (value) {
        if (value.type === 0) {
          totalPrice = (totalPrice * (100 - value.discount.percent)) / 100
        } else {
          totalPrice = totalPrice - value.discount.price
        }
      }

      onCheck(isCheck, { _id, totalPriceItem: totalPrice })
    }

    return (
      <div className="flex gap-x-4 overflow-auto rounded-sm bg-white px-5 py-4 text-sm text-zinc-500 shadow">
        <div className="flex basis-1/2 items-center gap-x-2">
          {/* Checkbox or out of stock*/}
          {isInValidOrder ? (
            <span className="shrink-0 rounded-xl bg-slate-400 px-2 py-1 text-xxs/3 uppercase text-white">
              HẾT HÀNG
            </span>
          ) : (
            <input
              checked={isCheck}
              type="checkbox"
              onChange={handleChecked}
              className={
                'h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded border-gray-300 px-2 text-primary accent-primary'
              }
            />
          )}

          {isInValidOrder ? (
            <span className="aspect-square w-20 shrink-0">
              <img
                src={image}
                alt="product_img_cart"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/images/default-image-product.png'
                }}
              />
            </span>
          ) : (
            <Link
              to={`/${categorySlug}/${productSlug}-${productId}`}
              className="aspect-square w-20 shrink-0">
              <img
                src={image}
                alt="product_img_cart"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/images/default-image-product.png'
                }}
              />
            </Link>
          )}

          <div className="flex-grow text-black/80">
            {isInValidOrder ? (
              <span className="mb-1 line-clamp-2 line-through opacity-30">{name}</span>
            ) : (
              <Link
                to={`/${categorySlug}/${productSlug}-${productId}`}
                className="mb-1 line-clamp-2">
                {name}
              </Link>
            )}
            <img src={voucherImg} alt="vouchers_img" className="h-5" />
          </div>

          <div className="flex shrink-0 flex-col gap-y-4">
            {!isInValidOrder && vouchers.length > 0 && (
              <DropdownVoucher
                vouchers={vouchers}
                voucherSelected={voucherSelected}
                onSelect={handleSetVoucher}
              />
            )}
          </div>
        </div>

        <div className="flex basis-1/2 flex-nowrap items-baseline gap-x-2 text-center">
          <div className="gap-x flex basis-1/4 flex-col">
            {isInValidOrder ? (
              <span className="line-clamp-1 w-full break-all text-sm text-black/[0.54]">
                {formatCurrency(0)}
              </span>
            ) : (
              <>
                {discount > 0 && (
                  <span className="line-clamp-1 w-full break-all text-sm text-black/[0.54] line-through">
                    {formatCurrency(price)}
                  </span>
                )}
                <span className="line-clamp-1 w-full break-all text-sm text-black/[0.87]">
                  {formatCurrency((price * (100 - discount)) / 100)}
                </span>
              </>
            )}
          </div>
          <div className="basis-1/4">
            {isInValidOrder ? (
              <span className="opacity-30">{amount}</span>
            ) : (
              <>
                <CartQuantityRow
                  key={_id + amount}
                  value={amount.toString()}
                  quantity={quantity}
                  orderId={_id}
                  productId={productId}
                />
                <div className="mt-1 line-clamp-2 text-xs italic text-black/[0.54]">
                  Còn {formatNumber(quantity)} sản phẩm
                </div>
              </>
            )}
          </div>
          <div className="basis-1/4">
            {isInValidOrder ? (
              <span className="text-primary">{formatCurrency(0)}</span>
            ) : (
              <span className="line-clamp-1 w-full break-words text-sm text-primary">
                {formatCurrency(totalPriceItem)}
              </span>
            )}
          </div>
          <div className="basis-1/4">
            <Button
              className="rounded-sm bg-primary px-4 py-2 text-white transition hover:opacity-80"
              onClick={() => {
                onDeleteProduct(_id)
              }}>
              Xóa
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

export const CartTableRowSkeleton = (
  <div className="flex w-full overflow-auto rounded-sm px-5 py-4 text-sm text-zinc-500 shadow">
    <div className="flex basis-1/2 animate-pulse items-center gap-x-2">
      <span className="h-[1.125rem] w-[1.125rem] shrink-0 bg-gray-300" />

      <img
        src="/images/loading-image-product.png"
        alt="product_loading_img_cart"
        className="aspect-square h-fit w-20 bg-gray-300"
      />

      <div className="flex-grow self-stretch">
        <p className="mb-2 h-4 bg-gray-300" />
        <p className="h-4 bg-gray-300" />
      </div>
    </div>
  </div>
)
