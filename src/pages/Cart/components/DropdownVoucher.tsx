import { useState } from 'react'

import classNames from 'classnames'
import { Check, ChevronDown, Info } from 'react-feather'

import { Button } from '@/components'
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/contexts'
import useBoolean from '@/hooks/useBoolean'

interface Props {
  shopType?: number
}

export const DropdownVoucher = ({ shopType = 2 }: Props) => {
  const { value, toggle } = useBoolean()
  const [note, setNote] = useState<string | undefined>()
  const [active, setActive] = useState<number | undefined>()
  return (
    <>
      <TooltipProvider placement="bottom-end" click={true}>
        <TooltipTrigger asChild onClick={toggle}>
          <div className="flex cursor-pointer flex-nowrap items-center gap-x-2">
            <span>Mã khuyến mãi</span>
            <ChevronDown
              size={16}
              className={classNames('transition', {
                'rotate-180': value,
                'rotate-0': !value
              })}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-y-3 overflow-hidden rounded-sm border border-black/10 bg-white p-4 shadow-2xl">
            <div className="flex gap-x-4 text-sm">
              <span className="min-w-[6.875rem] text-neutral-500">Kích Cỡ</span>
              <div className="flex flex-wrap gap-2">
                {Array(3)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <Button
                        key={index}
                        onMouseEnter={() => {
                          index % 2 === 0 && setNote(`Mua 2 tặng ${index}`)
                        }}
                        onMouseLeave={() => {
                          note && setNote(undefined)
                        }}
                        onClick={() => {
                          setActive((prev) => (prev === index + 1 ? undefined : index + 1))
                        }}
                        className={classNames(
                          'group relative border border-black/[0.09] px-8 py-2 transition',
                          {
                            'hover:border-primary hover:text-primary': shopType !== 1,
                            'hover:border-red-700 hover:text-red-700': shopType === 1,
                            'border-primary text-primary':
                              shopType !== 1 && active && active === index + 1,
                            'border-red-700 text-red-700':
                              shopType === 1 && active && active === index + 1
                          }
                        )}>
                        {index + 1}
                        <span
                          className={classNames(
                            `absolute bottom-0 right-0 overflow-hidden border-[10px] border-transparent`,
                            {
                              'border-b-primary border-r-primary':
                                shopType !== 1 && active && active === index + 1,
                              'border-b-red-700 border-r-red-700':
                                shopType === 1 && active && active === index + 1
                            }
                          )}
                        />
                        <Check
                          className={classNames('absolute bottom-0 right-0 z-10 text-white', {
                            visible: active && active === index + 1,
                            invisible: !active
                          })}
                          size={12}
                        />
                      </Button>
                    )
                  })}
              </div>
            </div>
            <div
              className={classNames(
                'flex h-min flex-nowrap items-center justify-end gap-x-1 text-sm',
                {
                  visible: note,
                  invisible: !note
                }
              )}>
              <Info size={16} />
              <span className="text-black/80">{note}11</span>
            </div>
            <div className="flex justify-end gap-x-6 text-sm">
              <Button className="rounded-sm bg-primary px-4 py-2 uppercase text-white transition hover:bg-primary/80">
                Xác nhận
              </Button>
            </div>
          </div>
          {/* <DropdownMenu className="min-w-[11rem] max-w-sm pt-2">
                <MenuItem text="wkdklw" />
              </DropdownMenu> */}
        </TooltipContent>
      </TooltipProvider>
      <span
        className={classNames('box mr-4 rounded py-0.5 text-center text-xs uppercase', {
          'bg-red-100 text-red-700': shopType === 1,
          'bg-primary text-white': shopType !== 1
        })}>
        Giảm ₫35k
      </span>
    </>
  )
}
