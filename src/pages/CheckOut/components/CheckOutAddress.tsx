import React from 'react'

import { MapPin, Plus } from 'react-feather'

import { Button, Modal } from '@/components'
import { useBoolean } from '@/hooks'

const Address = React.lazy(() => import('@/components/Address'))

interface Props {}

const CheckOutAddress = (props: Props) => {
  const { value, setValue } = useBoolean()
  return (
    <>
      <div className="flex flex-col gap-y-3 p-6">
        <div className="flex flex-row flex-nowrap items-center gap-x-2 text-primary">
          <MapPin className="fill-primary text-white" />
          <p className="text-lg">Địa Chỉ Nhận Hàng</p>
          <Button
            className="rounded-sm border border-primary bg-primary px-2 py-1 text-center capitalize text-white transition-colors hover:bg-secondary"
            onClick={() => {
              setValue(true)
            }}>
            <Plus className="float-left" />
            <span className="my-auto inline-block text-base">Thêm Địa Chỉ Mới</span>
          </Button>
        </div>
        <div className="flex flex-row gap-x-3">
          <b>fdfg grg (+84) 368921234</b>
          <p className="capitalize">
            Số 159, Đường D 16, Thị Trấn Vĩnh Thạnh Trung, Huyện Châu Phú, An Giang
          </p>
        </div>
      </div>

      <Modal
        headerText="Địa Chỉ Của Tôi"
        isLoading={false}
        setShowModal={setValue}
        confirmText="Hoàn thành"
        cancelText="Hủy"
        open={value}
        onSubmit={() => {
          alert('Oke')
        }}>
        <React.Suspense
          fallback={<div className="dots animate-[dots_1s_linear_infinite] text-center" />}>
          <Address />
        </React.Suspense>
      </Modal>
    </>
  )
}
export default CheckOutAddress
