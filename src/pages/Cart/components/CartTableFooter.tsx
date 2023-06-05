import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { Button } from '@/components'
import { PATHS } from '@/constants'
import { ProductSelected } from '@/pages/Cart/Cart'
import { formatCurrency, formatNumber } from '@/utils'

interface Props {
  isLoading: boolean
  quantity?: number
  isCheck?: boolean
  productsSelected: ProductSelected[]
  onSelect: (check: boolean) => void
  onMultipleDelete: () => void
}

export const CartTableFooter = ({
  isLoading,
  quantity,
  onSelect,
  isCheck,
  productsSelected,
  onMultipleDelete
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.checked)
  }

  const totalPrice = productsSelected.reduce(
    (total, currentProduct) => total + currentProduct.totalPriceItem,
    0
  )

  return (
    <div
      className={classNames(
        'sticky bottom-0 mb-2 flex gap-x-4 overflow-auto rounded-sm border-2 border-secondary px-5 py-4 text-sm text-zinc-500 shadow',
        {
          'bg-neutral-100': !isLoading
        }
      )}>
      {isLoading ? (
        <>{CartTableFooterSkeleton}</>
      ) : (
        <>
          <div className="inline-flex basis-1/2 items-center gap-x-4">
            {/* Checkbox */}
            <input
              id="cart-selected-all"
              checked={isCheck}
              onChange={handleChange}
              type="checkbox"
              className={
                'h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded border-gray-300 px-2 text-primary accent-primary'
              }
            />

            {quantity && (
              <label
                htmlFor="cart-selected-all"
                className={classNames(
                  'line-clamp-1 cursor-pointer rounded-sm bg-white px-4 py-2 text-lg text-black/80 transition-opacity hover:opacity-80'
                )}>
                Chọn Tất Cả ({formatNumber(quantity)})
              </label>
            )}
            <Button
              className={classNames('rounded-sm bg-white px-4 py-2 transition-opacity', {
                'hover:opacity-80': 0
              })}
              disabled={productsSelected.length === 0}
              onClick={onMultipleDelete}>
              Xóa ({productsSelected.length})
            </Button>
            <Button className="line-clamp-1 rounded-sm bg-primary px-4 py-2 text-white transition-opacity hover:opacity-80">
              Lưu vào thư mục yêu thích
            </Button>
          </div>
          <div className="flex basis-1/2 flex-nowrap items-center justify-end gap-x-4 text-center">
            <div className="flex flex-nowrap items-center gap-x-2 text-lg">
              <p className="line-clamp-1 text-black/80">
                Tổng thanh toán ({productsSelected.length} Sản phẩm):
              </p>
              <span className="text-xl text-primary">{formatCurrency(totalPrice)}</span>
            </div>
            <Link
              to={PATHS.CHECKOUT_PATH}
              className="line-clamp-1 rounded-sm bg-primary px-4 py-2 text-center text-white transition-opacity hover:opacity-80">
              Mua hàng
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

const CartTableFooterSkeleton = (
  <div className="flex w-full animate-pulse overflow-auto text-sm text-zinc-500">
    <div className="flex basis-1/2 items-center gap-x-2">
      <span className="h-[1.125rem] w-[1.125rem] shrink-0 bg-gray-300" />
      <span className="rounded-md bg-gray-300 px-16 py-4" />
      <span className="rounded-md bg-gray-300 px-12 py-4" />
      <span className="rounded-md bg-gray-300 px-16 py-4" />
    </div>
    <div className="flex basis-1/2 items-center justify-end gap-x-2">
      <span className="rounded-md bg-gray-300 px-32 py-4" />
      <span className="rounded-md bg-gray-300 px-24 py-4" />
    </div>
  </div>
)
