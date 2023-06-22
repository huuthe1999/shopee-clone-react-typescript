import React from 'react'

import { FormProvider, useForm } from 'react-hook-form'

import { IAddressSelect } from '@/types'

const Address = React.lazy(() => import('@/components/Address'))

const UserAddress = () => {
  const methods = useForm<IAddressSelect>({
    defaultValues: {
      addressSelected: '',
      address: '',
      type: 2
    }
  })

  return (
    <div className="relative pb-4">
      {/* Header */}
      <div className="flex flex-wrap justify-between border-b border-zinc-200 px-7 py-4">
        <h1 className="text-lg capitalize text-zinc-800">Địa chỉ của tôi</h1>
      </div>
      <div className="px-7 py-4">
        <React.Suspense
          fallback={<div className="dots mx-auto animate-[dots_1s_linear_infinite] text-center" />}>
          <FormProvider {...methods}>
            <Address className="absolute right-7 top-4" disableSelect />
          </FormProvider>
        </React.Suspense>
      </div>
    </div>
  )
}

export default UserAddress
