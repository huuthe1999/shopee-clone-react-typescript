import { formatNumber } from '@/utils'

interface Props {
  label: React.ReactNode
  id: string
  onSelect: (key: string, value: boolean) => void
  isSelect: boolean
  children?: React.ReactNode
}

function CateItemSection({ label, id, onSelect, isSelect }: Props) {
  return (
    <li className="cursor-pointer flex items-center hover:bg-gray-200 hover:text-primary rounded">
      <input
        type="checkbox"
        checked={isSelect}
        onChange={(e) => {
          onSelect(id, e.target.checked)
        }}
        id={`bordered-checkbox-${id}`}
        name={`bordered-checkbox-${id}`}
        className="w-4 h-4 text-primary accent-primary border-gray-300 rounded cursor-pointer"
      />

      <label
        htmlFor={`bordered-checkbox-${id}`}
        className="w-full p-4 pl-2 text-sm font-medium cursor-pointer">
        {label} ({formatNumber(998791121294)}+)
      </label>
    </li>
  )
}

export default CateItemSection
