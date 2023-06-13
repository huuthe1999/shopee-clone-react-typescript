import { startTransition } from 'react'

import classNames from 'classnames'

import { MenuItem } from '@/components'
import { IBaseAddress } from '@/types'

interface Props {
  isLoading: boolean
  onClick: (id: string) => void
  itemActive: string
  data?: IBaseAddress[]
}

export const ContentTab = ({ isLoading, itemActive, data, onClick }: Props) => {
  return isLoading ? (
    <li className="dots m-auto block h-full animate-[dots_1s_linear_infinite]" />
  ) : (
    <>
      {data?.map((item) => (
        <MenuItem
          key={item._id}
          text={item.name}
          className={classNames('bg-inherit')}
          buttonClassName={item._id === itemActive ? 'text-primary' : undefined}
          onClick={() => {
            startTransition(() => {
              onClick(item._id)
            })
          }}
        />
      ))}
    </>
  )
}
