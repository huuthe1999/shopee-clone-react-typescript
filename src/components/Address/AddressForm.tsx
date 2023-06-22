import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

import AddressFormInput, { AddressFormSelect } from './AddressFormInput'
import { TAddressForm } from './validate'

const AddressForm = () => {
  const { control, getValues } = useFormContext<TAddressForm>()

  return (
    <form className={classNames('flex flex-col gap-3 bg-white')} noValidate>
      <div className="flex flex-nowrap gap-4 max-sm:flex-col">
        <AddressFormInput control={control} name="name" label="Họ và tên" />
        <AddressFormInput control={control} name="phone" label="Số điện thoại" />
      </div>
      <AddressFormSelect
        label="Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã"
        province={getValues('province._id')}
        district={getValues('district._id')}
        ward={getValues('ward._id')}
      />
      <AddressFormInput control={control} name="address" label="Địa chỉ cụ thể" />
    </form>
  )
}

export default AddressForm
