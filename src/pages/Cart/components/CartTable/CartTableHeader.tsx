interface CartTableHeaderProps {
  isLoading: boolean
}
export const CartTableHeader = ({ isLoading }: CartTableHeaderProps) => {
  return (
    <div className="mb-2 flex overflow-auto rounded-sm border border-black/10 px-5 py-4 text-sm text-zinc-500 shadow">
      <div className="flex basis-1/2 items-center gap-x-2">
        {/* Checkbox */}
        {isLoading ? (
          <span className="h-[1.125rem] w-[1.125rem] shrink-0 animate-pulse bg-gray-200" />
        ) : (
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
}
