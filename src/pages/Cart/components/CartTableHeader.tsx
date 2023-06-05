import { memo } from 'react'

interface CartTableHeaderProps {
  isLoading: boolean
  isCheck?: boolean
  onSelect: (check: boolean) => void
}
export const CartTableHeader = memo(({ isLoading, isCheck, onSelect }: CartTableHeaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(e.target.checked)
  }

  return (
    <div className="mb-2 flex gap-x-4 overflow-auto rounded-sm border border-black/10 bg-white px-5 py-4 text-sm text-zinc-500 shadow">
      <div className="flex basis-1/2 items-center gap-x-2">
        {/* Checkbox */}
        {isLoading ? (
          <span className="h-[1.125rem] w-[1.125rem] shrink-0 animate-pulse bg-gray-300" />
        ) : (
          <input
            checked={isCheck}
            onChange={handleChange}
            type="checkbox"
            className={
              'h-[1.125rem] w-[1.125rem] shrink-0 cursor-pointer rounded border-gray-300 px-2 text-primary accent-primary'
            }
          />
        )}

        <div className="line-clamp-1 flex-grow text-black/80">Sản Phẩm</div>
      </div>
      <div className="flex basis-1/2 flex-nowrap gap-x-2 text-center">
        <div className="basis-1/4">Đơn Giá</div>
        <div className="basis-1/4">Số Lượng</div>
        <div className="basis-1/4">Số Tiền</div>
        <div className="basis-1/4">Thao Tác</div>
      </div>
    </div>
  )
})
