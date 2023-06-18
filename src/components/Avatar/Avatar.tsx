import classNames from 'classnames'

import { LoadingIcon } from '@/components'

interface Props {
  image?: string
  isLoading?: boolean
  letter?: string
  className?: string
}

export const Avatar = ({ letter = 'U', image, className, isLoading }: Props) => {
  return (
    <div className={classNames('relative overflow-hidden rounded-full', [className])}>
      {isLoading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-300">
          <LoadingIcon className="m-auto text-white" />
        </div>
      ) : !image ? (
        <div className="flex h-full w-full items-center justify-center bg-slate-600 font-semibold capitalize text-white">
          {letter}
        </div>
      ) : (
        <img src={image} alt="avatar" className="aspect-square w-full object-cover" />
      )}
    </div>
  )
}
