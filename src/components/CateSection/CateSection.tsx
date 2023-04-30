import { memo } from 'react'

import { useSearchParams } from 'react-router-dom'

import { SetParamsProps } from '@/pages/Category'

import CateItemSection from './CateItemSection'

interface Props {
  type: string
  name: string
  data: {
    id: string
    text: string
  }[]
  onChangeParam: (params?: SetParamsProps) => void
}

const CateSection = ({ type, name, data, onChangeParam }: Props) => {
  const [searchParams] = useSearchParams()

  const params = searchParams.get(type)?.split(',')
  const handleSetCateItemParams = (key: string, value: boolean) => {
    onChangeParam({ type, key, value })
  }

  return (
    <>
      <section className="text-sm text-black/[0.87] mt-2 border-b border-black/10">
        <p>{name}</p>
        <ul className="text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
          {data.map(({ text, id }) => (
            <CateItemSection
              key={id}
              label={text}
              id={id}
              onSelect={handleSetCateItemParams}
              isSelect={params?.includes(id) ?? false}
            />
          ))}
        </ul>
      </section>
    </>
  )
}

export default memo(CateSection)
