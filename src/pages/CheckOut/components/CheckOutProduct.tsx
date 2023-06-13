import { AUTH } from '@/constants'
import { CartTableFooter, CartTableHeader, CartTableRow } from '@/pages/Cart/components'
import { IProductSelected } from '@/types'
import { authUtils } from '@/utils'

export const CheckOutProduct = () => {
  const productsCartData: IProductSelected[] | undefined = authUtils.getItem(AUTH.CART_CHECKOUT)

  return (
    <div className="w-full rounded-sm">
      {productsCartData && (
        <div className="flex flex-col gap-y-2">
          <CartTableHeader />
          {productsCartData.map((cartProduct) => {
            return <CartTableRow key={cartProduct._id} {...cartProduct} />
          })}
          <CartTableFooter productsSelected={productsCartData} />
        </div>
      )}
    </div>
  )
}
