import { HTMLAttributes } from 'react'

import classNames from 'classnames'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string
}

const DropdownMenu = ({ title, className, children }: Props) => {
  return (
    <div
      className={classNames(
        'bg-white divide-y divide-gray-100 rounded-sm shadow-xl border-gray-300 border overflow-hidden',
        [className]
      )}>
      {title && <p className="text-black/50 p-2">{title}</p>}
      <ul className="text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
        {children}
      </ul>
    </div>
  )
}

export default DropdownMenu
