import { Link } from 'react-router-dom'

import sucessfulOrder from '@/assets/images/successfulOrder.png'
import { Button } from '@/components'
import { PATHS } from '@/constants'

const CheckOutSuccess = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-y-4 py-4">
      <img src={sucessfulOrder} alt="sucessful-order" className="aspect-square w-full max-w-xs" />
      <div className="flex flex-wrap gap-4">
        <Link
          to={PATHS.USER_PURCHASE_PATH}
          className="rounded-sm border bg-gray-300 px-4 py-2 text-center transition hover:border-stone-400 hover:opacity-70">
          Xem đơn hàng
        </Link>
        <Button className="rounded-sm bg-primary px-4 py-2 text-center text-white transition hover:bg-secondary">
          Tiếp tục mua sắm
        </Button>
      </div>
    </div>
  )
}

export default CheckOutSuccess
