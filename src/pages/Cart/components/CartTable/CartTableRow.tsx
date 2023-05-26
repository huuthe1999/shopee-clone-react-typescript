import { Link } from 'react-router-dom'

import voucherImg from '@/assets/images/vouchers.png'
import { ICart } from '@/types'

import { DropdownVoucher } from './DropdownVoucher'
interface Props {
  data: ICart
}

export const CartTableRow = ({
  data: {
    brief_product: { image, name }
  }
}: Props) => {
  return (
    <div className="flex overflow-auto rounded-sm px-5 py-4 text-sm text-zinc-500 shadow">
      <div className="flex basis-1/2 items-center gap-x-2">
        {/* Checkbox */}
        <input
          type="checkbox"
          // checked={isSelect}
          // onChange={(e) => {
          //   onSelect(id.toString(), e.target.checked)
          // }}
          id={`select-all`}
          name={`select-all`}
          className={
            'h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded border-gray-300 px-2 text-primary accent-primary'
          }
        />

        <img
          src={image}
          alt="product_img_cart"
          className="aspect-square h-fit w-20"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/images/default-image-product.png'
          }}
        />

        <div className="flex-grow text-black/80">
          <Link to="/" className="mb-1 line-clamp-2">
            {name}
          </Link>
          <img src={voucherImg} alt="vouchers_img" className="h-5" />
        </div>

        <div className="flex shrink-0 flex-col gap-y-1 self-start">
          <DropdownVoucher />
        </div>
      </div>

      <div className="flex basis-1/2 flex-nowrap gap-x-2 text-center">
        <div className="basis-1/4">Đơn Giá</div>
        <div className="basis-1/4">Số Lượng</div>
        <div className="basis-1/4">Số Tiền</div>
        <div className="basis-1/4">Thao Tác</div>
      </div>
    </div>
  )
}
