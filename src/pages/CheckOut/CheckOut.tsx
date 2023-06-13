import { Link } from 'react-router-dom'

import emptyCheckout from '@/assets/images/emptyCheckout.png'
import { AUTH, PATHS } from '@/constants'
import { IProductSelected } from '@/types'
import { authUtils } from '@/utils'

import { CheckOutAddress, CheckOutProduct } from './components'

const CheckOut = () => {
  const productsCartPersistData: IProductSelected[] | undefined = authUtils.getItem(
    AUTH.CART_CHECKOUT
  )

  return (
    <div className="mx-auto h-fit max-w-6xl">
      <div className="container mx-auto flex flex-col items-center justify-center gap-y-4 py-4">
        {!productsCartPersistData ? (
          <>
            <img src={emptyCheckout} alt="empty-order" className="aspect-square w-full max-w-xs" />
            <p className="text-md line-clamp-2 lg:text-xl">
              Bạn vui lòng kiểm tra giỏ hàng và thử lại.
            </p>
            <Link
              to={PATHS.CART_PATH}
              className="rounded-sm bg-primary px-4 py-2 text-center text-white transition hover:bg-secondary">
              Quay lại giỏ hàng
            </Link>
          </>
        ) : (
          <>
            <CheckOutAddress />
            <CheckOutProduct />
          </>
        )}
      </div>
    </div>
  )
}

export default CheckOut
