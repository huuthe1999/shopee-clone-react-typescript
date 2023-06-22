import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components'
import { useSetDefaultOrSelectedAddressMutation } from '@/hooks'
import { IAddress, IAddressSelect } from '@/types'
interface Props extends IAddress {
  disableSelect?: boolean
}

const AddressItem = ({
  _id,
  address,
  name,
  phone,
  district,
  province,
  ward,
  isDefault,
  isSelected,
  disableSelect = false
}: Props) => {
  const { register, setValue } = useFormContext<IAddressSelect>()

  const setDefaultOrSelectedAddressMutate = useSetDefaultOrSelectedAddressMutation()

  return (
    <div className="relative flex flex-nowrap items-baseline gap-x-3 py-4 pr-2">
      {/* Checkbox */}
      {!disableSelect && (
        <input
          {...register('addressSelected')}
          type="radio"
          value={_id}
          defaultChecked={isSelected}
          id={_id}
          className={'h-4 w-4 shrink-0 cursor-pointer border-gray-300 text-primary accent-primary'}
        />
      )}
      <label
        htmlFor={_id}
        className={classNames('text-md flex-grow text-black/[0.54]', {
          'cursor-pointer': !disableSelect
        })}>
        <div className="flex items-center">
          <span className="text-black/[0.87]">{name}</span>
          <span className="ml-2 border-l-[2px] border-black/[0.54] pl-2">(+84) {phone}</span>
          <div className="ml-auto flex flex-col items-center gap-2">
            <div className=" flex flex-wrap gap-2">
              <Button
                className="p-1 text-sm text-blue-500"
                onClick={() => {
                  setValue('address', _id)
                  setValue('type', 0)
                }}>
                Cập nhật
              </Button>
              {!isDefault && disableSelect && (
                <Button
                  className="p-1 text-sm text-blue-500"
                  onClick={() => {
                    setValue('address', _id)
                    setValue('type', 1)
                  }}>
                  Xóa
                </Button>
              )}
            </div>
            {disableSelect && (
              <Button
                onClick={async () => {
                  await setDefaultOrSelectedAddressMutate.mutateAsync({ id: _id, type: 0 })
                }}
                disabled={isDefault}
                className={classNames(
                  'rounded-sm border border-black/[0.26] px-2 py-1 text-sm hover:bg-black/[0.02]',
                  {
                    'pointer-events-auto cursor-not-allowed opacity-70': isDefault
                  }
                )}>
                Thiết lập mặc định
              </Button>
            )}
          </div>
        </div>
        <p className="line-clamp-2 capitalize">{address}</p>
        <p className="line-clamp-2 capitalize">
          {ward.name}, {district.name}, {province.name}
        </p>
        {isDefault && (
          <span className="shrink-0 rounded-sm border border-primary px-1.5 py-0.5 text-xxs capitalize text-primary">
            Mặc định
          </span>
        )}
      </label>
    </div>
  )
}

export default AddressItem
