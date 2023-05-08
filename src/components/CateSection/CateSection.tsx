import { useSearchParams } from 'react-router-dom'

import { SearchParamsProps } from '@/utils'

import CateItemSection from './CateItemSection'

interface Props {
  type: string
  name: string
  data: {
    id: string
    text: React.ReactNode
  }[]
  onChangeParam: (params?: SearchParamsProps) => void
}

const CateSection = ({ type, name, data, onChangeParam }: Props) => {
  const [searchParams] = useSearchParams()

  const params = searchParams.get(type)?.split(',')
  const handleSetCateItemParams = (value: string, check: boolean) => {
    onChangeParam({ name: type, value, check })
  }

  return (
    <>
      <section className="text-sm text-black/[0.87] mt-2 border-b border-black/30">
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

export default CateSection
