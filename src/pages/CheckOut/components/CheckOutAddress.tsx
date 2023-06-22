import React from 'react'

import { MapPin, Plus } from 'react-feather'
import { FormProvider, useForm } from 'react-hook-form'

import { Button, Modal } from '@/components'
import { useAddressesQuery, useBoolean, useSetDefaultOrSelectedAddressMutation } from '@/hooks'
import { IAddressSelect } from '@/types'

const Address = React.lazy(() => import('@/components/Address'))

const CheckOutAddress = () => {
  const { data: addressesQueryData, isLoading } = useAddressesQuery()
  const setDefaultOrSelectedAddressMutation = useSetDefaultOrSelectedAddressMutation()
  const { value, setValue } = useBoolean()

  const addressesData = addressesQueryData?.data.data

  const addressSelected = addressesData?.find((address) => address.isSelected)

  const methods = useForm<IAddressSelect>({
    defaultValues: {
      addressSelected: '',
      address: '',
      type: 2
    }
  })

  return (
    <>
      <div className="flex w-full flex-col gap-y-3 rounded-b-sm bg-white p-6">
        <div className="flex flex-row flex-nowrap items-center gap-x-2 text-primary">
          <MapPin className="fill-primary text-white" />
          <p className="text-lg">Địa Chỉ Nhận Hàng</p>
          <Button
            className="rounded-sm border border-primary bg-primary px-2 py-1 text-center capitalize text-white transition-colors hover:bg-secondary"
            onClick={() => {
              setValue(true)
            }}>
            <Plus className="float-left" />
            <span className="my-auto inline-block text-base capitalize">Danh sách địa chỉ</span>
          </Button>
        </div>
        {isLoading ? (
          <div className="flex animate-pulse flex-row items-center gap-x-3">
            <span className="basis-1/6 rounded-md bg-gray-300 py-4" />
            <span className="basis-2/6 rounded-md bg-gray-300 py-4" />
            <span className="basis-1/12 rounded-md bg-gray-300 py-4" />
            <span className="basis-1/12 rounded-md bg-gray-300 py-4" />
          </div>
        ) : (
          addressSelected && (
            <div className="flex flex-row items-center gap-x-3">
              <b>
                {addressSelected.name} (+84) {addressSelected.phone.slice(1)}
              </b>
              <p className="capitalize">
                {[
                  addressSelected.address,
                  addressSelected.ward.name,
                  addressSelected.district.name,
                  addressSelected.province.name
                ].join(', ')}
              </p>
              {addressSelected.isDefault && (
                <span className="shrink-0 rounded-sm border border-primary px-1.5 py-0.5 text-xxs capitalize text-primary">
                  Mặc định
                </span>
              )}
            </div>
          )
        )}
      </div>

      <Modal
        headerText="Địa Chỉ Của Tôi"
        isLoading={false}
        setShowModal={setValue}
        isHiddenFooter={addressesData?.length === 0}
        confirmText="Xác nhận"
        cancelText="Hủy"
        open={value}
        onSubmit={() => {
          const addressIdSelected = methods.getValues('addressSelected')
          if (addressIdSelected === addressSelected?._id) {
            setValue(false)
            return
          }
          setDefaultOrSelectedAddressMutation.mutate(
            { id: addressIdSelected, type: 1 },
            {
              onSettled() {
                setValue(false)
                methods.reset()
              }
            }
          )
        }}>
        <React.Suspense
          fallback={<div className="dots mx-auto animate-[dots_1s_linear_infinite] text-center" />}>
          <FormProvider {...methods}>
            <Address />
          </FormProvider>
        </React.Suspense>
      </Modal>
    </>
  )
}
export default CheckOutAddress
