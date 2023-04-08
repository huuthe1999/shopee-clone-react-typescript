import { Link } from 'react-router-dom'

import { EmptyCartIcon } from '@/components/Icon'

import { DropItemMenu } from './type'

interface Props {
  data: DropItemMenu[]
}

const DropdownMenu = ({ data }: Props) => {
  const renderMenuItem = data.map(({ to, text }, index) => {
    return (
      <li key={index}>
        {to ? (
          <Link
            to={to}
            className="block px-4 py-2 hover:bg-gray-100 hover:text-teal-500 text-ellipsis">
            {text}
          </Link>
        ) : (
          <span className="block px-4 py-2 hover:bg-gray-100 hover:text-primary text-ellipsis cursor-pointer">
            {text}
          </span>
        )}
      </li>
    )
  })

  const renderData =
    data.length === 0 ? (
      <div className="py-14 overflow-hidden text-center w-full">
        <EmptyCartIcon width="25rem" />
      </div>
    ) : (
      <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
        {renderMenuItem}
      </ul>
    )

  return (
    <div
      id="dropdown"
      className="z-10 bg-white divide-y divide-gray-100 rounded-sm shadow-md overflow-hidden min-w-[11rem]">
      {renderData}
    </div>
  )
}

export default DropdownMenu
