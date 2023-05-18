import { HTMLAttributes } from 'react'

import classNames from 'classnames'
import { useSearchParams } from 'react-router-dom'

import { SearchParamsProps } from '@/utils'

import CateItemSection from './CateItemSection'

interface CateSectionProps extends HTMLAttributes<HTMLElement> {
  type: string
  name: string
  data: {
    _id: string | number
    name: React.ReactNode
  }[]
  onChangeParam: (params?: SearchParamsProps) => void
}

const CateSection = ({ type, name, data, onChangeParam, className }: CateSectionProps) => {
  const [searchParams] = useSearchParams()
  const params = searchParams.get(type)?.split(',')
  const handleSetCateItemParams = (value: string, check: boolean) => {
    onChangeParam({ name: type, value, check })
  }

  return (
    <>
      <section className="mt-2 border-b border-black/30 text-sm text-black/[0.87]">
        <p className="flex">
          {name}
          {params && params?.length > 0 && (
            <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {params?.length}
            </span>
          )}
        </p>
        <ul
          className={classNames('text-sm text-gray-700', [className])}
          aria-labelledby="dropdownDefaultButton">
          {data.map(({ name, _id }) => (
            <CateItemSection
              key={_id}
              label={name}
              id={_id}
              onSelect={handleSetCateItemParams}
              isSelect={params?.includes(_id.toString()) ?? false}
            />
          ))}
        </ul>
      </section>
    </>
  )
}

export default CateSection
