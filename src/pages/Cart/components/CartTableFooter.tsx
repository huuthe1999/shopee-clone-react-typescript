import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components'
import { AUTH, PATHS } from '@/constants'
import { useAddressesQuery, useCheckoutMutation } from '@/hooks'
import { IProductSelected } from '@/types'
import { authUtils, formatCurrency } from '@/utils'

interface Props {
  isLoading?: boolean
  quantity?: number
  isCheck?: boolean
  productsSelected: IProductSelected[]
  onSelect?: (check: boolean) => void
  onMultipleDelete?: () => void
}

export const CartTableFooter = ({
  isLoading,
  quantity,
  onSelect,
  isCheck,
  productsSelected,
  onMultipleDelete
}: Props) => {
  const navigate = useNavigate()
  const { data: addressesQueryData } = useAddressesQuery()
  const checkoutMutation = useCheckoutMutation()

  const addressesData = addressesQueryData?.data.data

  const addressSelected = addressesData?.find((address) => address.isSelected)

  const address =
    (addressSelected &&
      [
        addressSelected.address,
        addressSelected.ward.name,
        addressSelected.district.name,
        addressSelected.province.name
      ].join(', ')) ??
    ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect?.(e.target.checked)
  }

  const totalPrice = productsSelected.reduce(
    (total, currentProduct) => total + (currentProduct?.totalPriceItem ?? 0),
    0
  )

  return (
    <div
      className={classNames(
        'sticky bottom-0 z-[9001] mb-2 flex gap-x-2 overflow-auto rounded-sm border-2 border-secondary p-2 text-sm text-zinc-500 shadow sm:gap-x-4 md:px-5 md:py-4',
        {
          'bg-neutral-100': !isLoading
        }
      )}>
      {isLoading ? (
        <>{CartTableFooterSkeleton}</>
      ) : (
        <>
          {onSelect && (
            <div className="inline-flex basis-auto items-center gap-x-2 lg:basis-1/2 lg:gap-x-4">
              {/* Checkbox */}
              <input
                disabled={quantity === 0}
                id="cart-selected-all"
                checked={isCheck}
                onChange={handleChange}
                type="checkbox"
                className={classNames(
                  'h-[1.125rem] w-[1.125rem] shrink-0 rounded border-gray-300 px-2 text-primary accent-primary',
                  {
                    'cursor-not-allowed': quantity === 0,
                    'cursor-pointer': quantity !== 0
                  }
                )}
              />

              {quantity && quantity > 0 ? (
                <label
                  htmlFor="cart-selected-all"
                  className={classNames(
                    'line-clamp-1 shrink-0 cursor-pointer rounded-sm bg-white p-2 text-xs text-black/80 transition-opacity hover:opacity-80 md:px-4 md:py-2 md:text-lg'
                  )}>
                  Chọn ({productsSelected.length})
                </label>
              ) : null}
              <Button
                className={classNames(
                  'shrink-0 rounded-sm bg-white p-2 transition-opacity md:px-4 md:py-2',
                  {
                    'hover:opacity-80': 0
                  }
                )}
                disabled={productsSelected.length === 0}
                onClick={onMultipleDelete}>
                Xóa ({productsSelected.length})
              </Button>
              {/* <Button className="line-clamp-1 rounded-sm bg-primary px-4 py-2 text-white transition-opacity hover:opacity-80">
                Lưu vào thư mục yêu thích
              </Button> */}
            </div>
          )}
          <div
            className={classNames(
              'flex flex-grow flex-nowrap items-center gap-x-2 sm:justify-end sm:gap-x-4',
              {
                'basis-1/2 text-center': onSelect,
                'basis-full text-right': !onSelect
              }
            )}>
            <div className="ml-auto flex flex-wrap items-center justify-end gap-x-2 text-xs sm:flex-row sm:flex-nowrap md:text-lg">
              <p className="line-clamp-2 shrink-0 text-black/80 md:line-clamp-1">
                Tổng thanh toán{' '}
                <span className="block md:inline">({productsSelected.length} Sản phẩm):</span>
              </p>
              <span className="line-clamp-1 text-lg text-primary md:text-xl">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <Button
              isLoading={checkoutMutation.isLoading}
              disabled={checkoutMutation.isLoading}
              onClick={() => {
                if (productsSelected.length === 0) {
                  toast.info('Bạn vẫn chưa chọn sản phẩm nào để mua.')
                  return
                }
                // Handle order product
                if (onSelect) {
                  // Store cart checkout to local storage
                  authUtils.setItem(AUTH.CART_CHECKOUT, productsSelected)
                  navigate(PATHS.CHECKOUT_PATH)
                } else {
                  if (!addressSelected) {
                    toast.warn('Vui lòng chọn địa chỉ giao hàng')
                    return
                  }
                  checkoutMutation.mutate(
                    productsSelected.map((product) => {
                      const voucher = product.voucher
                      const totalPrice = product.totalPriceItem as number
                      if (voucher) {
                        return {
                          _id: product._id,
                          address,
                          totalPrice,
                          voucher:
                            voucher && voucher.type === 0
                              ? '-' + voucher.discount.percent + ' ﹪'
                              : '-' + formatCurrency(voucher.discount.price)
                        }
                      }
                      return {
                        _id: product._id,
                        totalPrice,
                        address
                      }
                    }),
                    {
                      onSuccess() {
                        // Handle confirm order
                        authUtils.removeItem(AUTH.CART_CHECKOUT)
                        navigate(PATHS.CHECKOUT_SUCCESS_PATH)
                      }
                    }
                  )
                }
              }}
              className={classNames(
                'line-clamp-1 shrink-0 rounded-sm bg-primary p-2 text-center text-white transition-opacity md:px-4 md:py-2',
                { 'hover:opacity-80': productsSelected.length !== 0 }
              )}>
              {onSelect ? 'Mua hàng' : 'Đặt hàng'}
            </Button>
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
