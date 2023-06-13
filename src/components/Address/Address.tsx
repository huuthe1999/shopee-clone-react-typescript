import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Plus } from 'react-feather'
import { FormProvider, useForm } from 'react-hook-form'

import noData from '@/assets/images/noData.png'
import { Button, Modal } from '@/components'
import { useAddressMutation, useAddressesQuery, useBoolean } from '@/hooks'

import { TAddressForm, addressFormSchema } from './validate'
const AddressItem = React.lazy(() => import('./AddressItem'))
const AddressForm = React.lazy(() => import('./AddressForm'))

const Address = () => {
  const { data: addressesQueryData } = useAddressesQuery()
  const addressMutate = useAddressMutation()

  const [headerText, setHeaderText] = useState('')

  const { value, setValue } = useBoolean()

  const addressesData = addressesQueryData?.data.data

  const methods = useForm<TAddressForm>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      province: {},
      district: {},
      ward: {},
      fillAddress: false
    },
    resolver: yupResolver(addressFormSchema.pick(['name', 'phone', 'address', 'fillAddress'])),
    reValidateMode: 'onBlur',
    shouldFocusError: false
  })

  const handleSubmitForm = async (data: TAddressForm) => {
    addressMutate.mutate(
      { ...data, isDefault: addressesData?.length === 0, isSelected: addressesData?.length === 0 },
      {
        onSettled() {
          setValue(false)
        }
      }
    )
  }

  return (
    <>
      <Button
        className="-mt-5 mb-2 rounded-md border border-primary bg-primary px-2 py-1 text-center capitalize text-white transition-colors hover:bg-secondary"
        onClick={() => {
          setValue(true)
          setHeaderText('Địa chỉ mới')
        }}>
        <Plus className="float-left" />
        <span className="my-auto inline-block text-base">Thêm Địa Chỉ Mới</span>
      </Button>

      <div className="container mx-auto flex max-h-96 flex-col divide-y-2 overflow-y-auto">
        {addressesData?.length === 0 ? (
          <div>
            <img
              src={noData}
              alt="no-data"
              className="pointer-events-none mx-auto aspect-square max-w-[16rem]"
            />
            <p className="line-clamp-1 text-center">Danh sách rỗng</p>
          </div>
        ) : (
          <>
            {addressesData?.map((address) => (
              <AddressItem key={address._id} {...address} />
            ))}
          </>
        )}
      </div>

      <FormProvider {...methods}>
        <Modal
          headerText={headerText}
          disabledSubmitButton={methods.formState.isSubmitting}
          isLoading={methods.formState.isSubmitting}
          setShowModal={setValue}
          disabledBlur
          confirmText="Hoàn thành"
          cancelText="Hủy"
          open={value}
          onCancel={() => {
            setValue(false)
            methods.reset()
          }}
          onSubmit={methods.handleSubmit(handleSubmitForm)}>
          <React.Suspense
            fallback={<div className="dots mx-auto animate-[dots_1s_linear_infinite]" />}>
            <AddressForm />
          </React.Suspense>
        </Modal>
      </FormProvider>
    </>
  )
}

export default Address
