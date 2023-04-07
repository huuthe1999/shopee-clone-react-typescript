import { Link } from 'react-router-dom'

import { DropItemMenu } from './type'

interface Props {
  data: DropItemMenu[]
}

const DropdownMenu = ({ data }: Props) => {
  const renderData = data.map(({ to, text }, index) => {
    const Comp = to ? Link : 'span'
    return (
      <li key={index}>
        {Comp === 'span' ? (
          <Comp className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-ellipsis cursor-pointer">
            {text}
          </Comp>
        ) : to ? (
          <Comp
            to={to}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-ellipsis">
            {text}
          </Comp>
        ) : null}
      </li>
    )
  })

  return (
    <div
      id="dropdown"
      className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton">
        {renderData}
      </ul>
    </div>
  )
}

export default DropdownMenu
