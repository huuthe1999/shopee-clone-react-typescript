import React from 'react'

import { EmptyCartIcon, MenuItem, MenuItemWithModal } from '@/components'

import { DropItemMenu } from './type'

interface Props {
  title?: string
  data: DropItemMenu[]
  footer?: React.ReactNode
}

const DropdownMenu = ({ data, title, footer }: Props) => {
  const renderMenuItem = data.map((props, index) => {
    return !props.hasPopup ? (
      <MenuItem key={index} {...props} />
    ) : (
      <MenuItemWithModal key={index} {...props} />
    )
  })

  const renderData =
    data.length === 0 ? (
      <div className="px-2 py-14 overflow-hidden text-center w-full">
        <EmptyCartIcon width="25rem" />
        <p className="mt-4 text-gray-700 text-sm p-2">Chưa Có Sản Phẩm</p>
      </div>
    ) : (
      <ul className="text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
        {renderMenuItem}
      </ul>
    )

  return (
    <div
      id="dropdown"
      className="bg-white divide-y divide-gray-100 rounded-sm shadow-md overflow-hidden min-w-[11rem] max-w-sm h-fit pt-2">
      {title && <p className="text-black/50 p-2">Sản Phẩm Mới Thêm</p>}
      {renderData}
      {data.length > 0 && footer && (
        <div className="p-2 flex justify-between items-center">
          <p className="text-xs text-black/70 capitalize">2 sản phầm nữa trong giỏ hàng</p>
          {footer}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
