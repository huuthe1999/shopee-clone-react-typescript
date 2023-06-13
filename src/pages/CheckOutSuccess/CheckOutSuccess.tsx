import sucessfulOrder from '@/assets/images/successfulOrder.png'
import { Button } from '@/components'

const CheckOutSuccess = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-y-4 py-4">
      <img src={sucessfulOrder} alt="sucessful-order" className="aspect-square w-full max-w-xs" />
      <div className="flex flex-wrap gap-4">
        <Button className="rounded-sm border bg-gray-300 px-4 py-2 text-center transition hover:border-stone-400 hover:opacity-70">
          Xem đơn hàng
        </Button>
        <Button className="rounded-sm bg-primary px-4 py-2 text-center text-white transition hover:bg-secondary">
          Tiếp tục mua sắm
        </Button>
      </div>
    </div>
  )
}

export default CheckOutSuccess
