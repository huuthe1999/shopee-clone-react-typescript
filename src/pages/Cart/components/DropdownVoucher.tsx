import classNames from 'classnames'
import { Check, ChevronDown } from 'react-feather'

import { Button } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import { IProduct, TVoucher } from '@/types'
import { formatCurrency } from '@/utils'

interface Props {
  vouchers: IProduct['vouchers']
  voucherSelected?: TVoucher
  onSelect: (value?: TVoucher) => void
}

const DropdownVoucher = ({ vouchers, voucherSelected, onSelect }: Props) => {
  const activeVoucher = vouchers.find((voucher) => voucher._id === voucherSelected?._id)

  return (
    <>
      <TooltipProvider placement="bottom-end" click>
        <TooltipTrigger asChild>
          <div className="flex cursor-pointer flex-nowrap items-center gap-x-2 font-semibold text-primary">
            <span>Mã khuyến mãi</span>
            <ChevronDown size={16} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-y-3 overflow-hidden rounded-sm border border-black/10 bg-white p-4 shadow-2xl">
            <div className="flex gap-x-4 text-sm">
              <span className="min-w-[6.875rem] text-neutral-500">Mã giảm giá</span>
              <div className="flex flex-wrap gap-2">
                {vouchers.map((voucher) => {
                  return (
                    <Button
                      key={voucher._id}
                      onClick={() => {
                        onSelect(activeVoucher?._id === voucher._id ? undefined : voucher)
                      }}
                      className={classNames(
                        'group relative border px-8 py-2 transition hover:border-primary hover:text-primary',
                        {
                          'border-primary text-primary': voucherSelected?._id === voucher._id,
                          'border-black/[0.09] text-inherit': voucherSelected?._id !== voucher._id
                        }
                      )}>
                      {voucher.type === 0
                        ? voucher.discount.percent + '﹪'
                        : formatCurrency(voucher.discount.price)}
                      <span
                        className={classNames(
                          `absolute bottom-0 right-0 overflow-hidden border-[10px] border-transparent`,
                          {
                            'border-b-primary border-r-primary':
                              voucherSelected?._id === voucher._id
                          }
                        )}
                      />
                      <Check
                        className={classNames('absolute bottom-0 right-0 z-10 text-white', {
                          visible: voucherSelected?._id === voucher._id,
                          invisible: voucherSelected?._id !== voucher._id
                        })}
                        size={12}
                      />
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </TooltipContent>
      </TooltipProvider>
      <div className="min-h-[1.25rem]">
        {activeVoucher && (
          <span
            className={classNames(
              'box mr-4 block rounded bg-primary py-0.5 text-center text-xs uppercase text-white'
            )}>
            Giảm
            {activeVoucher.type === 0
              ? activeVoucher.discount.percent + ' ﹪'
              : formatCurrency(activeVoucher.discount.price)}
          </span>
        )}
      </div>
    </>
  )
}

export default DropdownVoucher
