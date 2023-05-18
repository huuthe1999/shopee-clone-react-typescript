interface Props {
  label: React.ReactNode
  id: string | number
  onSelect: (name: string, check: boolean) => void
  isSelect: boolean
  children?: React.ReactNode
}

function CateItemSection({ label, id, onSelect, isSelect }: Props) {
  return (
    <li className="flex cursor-pointer items-center rounded hover:bg-gray-200 hover:text-primary">
      <input
        type="checkbox"
        checked={isSelect}
        onChange={(e) => {
          onSelect(id.toString(), e.target.checked)
        }}
        id={`${label}-${id}`}
        name={`${label}-${id}`}
        className={'h-4 w-4 cursor-pointer rounded border-gray-300 text-primary accent-primary'}
      />

      <label
        htmlFor={`${label}-${id}`}
        className="w-full cursor-pointer p-4 pl-2 text-sm font-medium">
        {label}
      </label>
    </li>
  )
}

export default CateItemSection
