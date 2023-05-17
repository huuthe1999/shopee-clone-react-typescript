interface Props {
  label: React.ReactNode
  id: string | number
  onSelect: (name: string, check: boolean) => void
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
          onSelect(id.toString(), e.target.checked)
        }}
        id={`${label}-${id}`}
        name={`${label}-${id}`}
        className={'w-4 h-4 text-primary accent-primary border-gray-300 rounded cursor-pointer'}
      />

      <label
        htmlFor={`${label}-${id}`}
        className="w-full p-4 pl-2 text-sm font-medium cursor-pointer">
        {label}
      </label>
    </li>
  )
}

export default CateItemSection
