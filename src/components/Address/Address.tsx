import React, { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { Plus } from 'react-feather'
import { FormProvider, SubmitErrorHandler, useForm, useFormContext } from 'react-hook-form'

import noData from '@/assets/images/noData.png'
import { Button, Modal } from '@/components'
import {
  useAddressMutation,
  useAddressesQuery,
  useBoolean,
  useUpdateAddressMutation
} from '@/hooks'
import { IAddressSelect } from '@/types'

import { TAddressForm, addressFormSchema } from './validate'
const AddressItem = React.lazy(() => import('./AddressItem'))
const AddressForm = React.lazy(() => import('./AddressForm'))
const ModalConfirm = React.lazy(() => import('@/components/Modal/ModalConfirm'))

const Address = ({ className, disableSelect }: { className?: string; disableSelect?: boolean }) => {
  const { data: addressesQueryData } = useAddressesQuery()
  const addressMutate = useAddressMutation()
  const updateAddressMutate = useUpdateAddressMutation()

  const [headerText, setHeaderText] = useState('')

  const { value, setValue } = useBoolean()

  const addressesData = addressesQueryData?.data.data

  const methodsFormContext = useFormContext<IAddressSelect>()

  const addressSelect = methodsFormContext.watch('addressSelected')
  const addressId = methodsFormContext.watch('address')
  const type = methodsFormContext.watch('type')

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
    resolver:
      type === 0
        ? yupResolver(addressFormSchema.pick(['name', 'phone', 'address', 'fillAddress']))
        : undefined,
    mode: 'all',
    reValidateMode: 'onBlur',
    shouldFocusError: false
  })

  const addressSelected = addressesData?.find((address) =>
    type !== 2 ? address._id === addressId : address._id === addressSelect
  )

  const handleReset = useCallback(() => {
    setValue(false)
    methods.reset()
    methodsFormContext.reset()
    setHeaderText('')
  }, [methods, methodsFormContext, setValue])

  const handleSubmitForm = async (data: TAddressForm) => {
    if (addressId) {
      updateAddressMutate.mutate(
        {
          ...data,
          _id: addressId,
          actionType: type as 0 | 1
        },
        {
          onSettled() {
            handleReset()
          }
        }
      )
    } else {
      addressMutate.mutate(
        {
          ...data,
          isDefault: addressesData?.length === 0,
          isSelected: addressesData?.length === 0
        },
        {
          onSettled() {
            handleReset()
          }
        }
      )
    }
  }

  const handleErrorForm: SubmitErrorHandler<TAddressForm> = async (errors) => {
    console.log('🚀 ~ handleSubmitForm ~ error:', errors)
  }

  useEffect(() => {
    if (type === 2) {
      return
    }

    setHeaderText(type === 0 ? 'Cập nhật địa chỉ' : 'Xóa địa chỉ')
    setValue(true)
    if (addressId && addressSelected) {
      const { name, phone, address, province, district, ward } = addressSelected
      if (type === 0) {
        methods.setValue('name', name, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
        methods.setValue('phone', phone, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
        methods.setValue('address', address, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
        methods.setValue('province', province, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
        methods.setValue('district', district, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
        methods.setValue('ward', ward, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })

        methods.setValue('fillAddress', true, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        })
      }
    }
  }, [addressId, setValue, methods, addressSelected, addressSelect, type])

  return (
    <>
      <Button
        className={classNames(
          'rounded-md border border-primary bg-primary px-2 py-1 text-center capitalize text-white transition-colors hover:bg-secondary',
          { '-mt-5 mb-2': !className },
          [className]
        )}
        onClick={() => {
          setValue(true)
          setHeaderText('Địa chỉ mới')
        }}>
        <Plus className="float-left" />
        <span className="my-auto inline-block text-base">Thêm Địa Chỉ Mới</span>
      </Button>

      <div className="container mx-auto flex max-h-[28rem] flex-col divide-y-2 overflow-y-auto">
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
              <AddressItem key={address._id} {...address} disableSelect={disableSelect} />
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
          disabledBlur={type === 0}
          confirmText={type === 1 ? 'Xoá' : 'Hoàn thành'}
          cancelText="Hủy"
          open={value}
          onSubmit={methods.handleSubmit(handleSubmitForm, handleErrorForm)}
          onCancel={handleReset}>
          <React.Suspense
            fallback={<div className="dots mx-auto animate-[dots_1s_linear_infinite]" />}>
            {type !== 1 ? (
              <AddressForm />
            ) : (
              <ModalConfirm title="Xoá địa chỉ" description="Bạn có chắc muốn xoá địa chỉ này?" />
            )}
          </React.Suspense>
        </Modal>
      </FormProvider>
    </>
  )
}

export default Address
