import { useFormContext } from 'react-hook-form'

import { Button } from '@/components'
import { IAddress } from '@/types'
interface Props extends IAddress {}

const AddressItem = ({
  _id,
  address,
  name,
  phone,
  district,
  province,
  ward,
  isDefault,
  isSelected
}: Props) => {
  const { register } = useFormContext<{ address: IAddress | null }>()

  return (
    <div className="flex flex-nowrap items-baseline gap-x-3 py-4 pr-2">
      {/* Checkbox */}
      <input
        {...register('address')}
        type="radio"
        defaultChecked={isSelected}
        value={_id}
        id={_id}
        className={'h-4 w-4 shrink-0 cursor-pointer border-gray-300 text-primary accent-primary'}
      />
      <label htmlFor={_id} className="text-md flex-grow cursor-pointer text-black/[0.54]">
        <div className="flex items-center">
          <span className="text-black/[0.87]">{name}</span>
          <span className="mx-2 w-0.5 self-stretch bg-black/[0.54]"></span>
          <span>(+84) {phone}</span>
          <Button className="ml-auto p-1 text-sm text-blue-500">Cập nhật</Button>
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
