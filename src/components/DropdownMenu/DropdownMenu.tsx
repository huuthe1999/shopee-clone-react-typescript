import { HTMLAttributes } from 'react'

import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string
}

const DropdownMenu = ({ title, className, children }: Props) => {
  return (
    <div
      className={classNames(
        'divide-y divide-gray-100 overflow-y-auto overflow-x-hidden rounded-sm bg-white shadow-xl',
        [className]
      )}>
      {title && <p className="p-2 text-black/50">{title}</p>}
      <ul
        className="flex h-full flex-col text-sm text-gray-700"
        aria-labelledby="dropdownDefaultButton">
        {children}
      </ul>
    </div>
  )
}

export default DropdownMenu
