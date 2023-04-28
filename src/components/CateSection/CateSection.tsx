import { MenuItem } from '@/components'

import CateItemSection from './CateItemSection'

interface Props {}

const fakeData = [
  {
    id: '1',
    text: 'Áo hoodie 1'
  },
  {
    id: '2',
    text: 'Áo hoodie 2'
  },
  {
    id: '3',
    text: 'Áo hoodie 3'
  },
  {
    id: '4',
    text: 'Áo hoodie 4'
  }
]
const CateSection = (props: Props) => {
  return (
    <>
      <section className="text-sm text-black/[0.87] mt-2">
        <p>Theo Danh Mục</p>
        <MenuItem text="wdh" />
        <ul className="text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
          {fakeData.map(({ text, id }) => (
            <CateItemSection key={id} label={text} id={id} />
          ))}
        </ul>
      </section>
    </>
  )
}

export default CateSection
