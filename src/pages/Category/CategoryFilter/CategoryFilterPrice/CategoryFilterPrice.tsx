import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

import queryString from 'query-string'
import { useSearchParams } from 'react-router-dom'

import { Button } from '@/components'
import { OrderType, SortByType } from '@/types'

const CategoryFilterPrice = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const from = searchParams.get('minPrice') ?? ''
  const to = searchParams.get('maxPrice') ?? ''
  const [isError, setIsError] = useState(false)
  const [value, setValue] = useState({
    from,
    to
  })

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const currentValue = event.currentTarget.value
    const maxLength = 13
    // allow only numeric values and the delete key
    if (
      (event.key !== 'Backspace' && // delete
        (event.key < '0' || event.key > '9')) || // other non-numeric keys
      (currentValue.length > maxLength && event.key !== 'Backspace') // max length check
    ) {
      event.preventDefault()
    } else {
      if (isError) {
        setIsError(false)
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    // Remove zero-numeric characters at first from the input value
    // const newValue = value.replace(/^0+/, '')
    // console.log('🚀 ~ handleChange ~ newValue:', newValue)

    setValue((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    let { from, to } = value
    // Remove zero-numeric characters at first from the input value
    from = from.replace(/^0+/, '')
    to = to.replace(/^0+/, '')
    setValue((prev) => ({ ...prev, from, to }))

    // Có thể bỏ trống 1 trong 2 ô input, nhưng nếu điền cả 2 sẽ check điều kiện
    if (Boolean(from) && Boolean(to) && +from >= +to) {
      setIsError(true)
    } else {
      setSearchParams(
        queryString.stringify(
          {
            page: 1,
            minPrice: from,
            maxPrice: to,
            order: (searchParams.get('order') as OrderType) || '',
            sortBy: (searchParams.get('sortBy') as SortByType) || 'popular'
          },
          {
            skipNull: true,
            skipEmptyString: true
          }
        ),
        { preventScrollReset: true }
      )
    }
  }

  useEffect(() => {
    if (from !== value.from || to !== value.to) {
      setValue((prev) => ({ ...prev, from, to }))
    }
  }, [searchParams])

  return (
    <section className="text-sm text-black/[0.87] mt-2 border-b border-black/30">
      <p>Khoảng Giá</p>
      <div className="flex flex-nowrap items-center gap-x-1 py-4">
        <input
          value={value.from}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          name="from"
          id="from"
          placeholder="₫ Từ"
          className="basis-2/5 border border-black/[0.26] rounded-sm py-1 px-1"
        />
        <span className="h-[2px] basis-auto bg-slate-500 px-2" />
        <input
          value={value.to}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          name="to"
          id="to"
          placeholder="₫ Đến"
          className="basis-2/5 border border-black/[0.26] rounded-sm py-1 px-1"
        />
      </div>
      {/* Error text */}
      {isError && (
        <div className="text-red-600 text-xs line-clamp-2">Vui lòng điền khoảng giá phù hợp</div>
      )}
      <Button
        className="uppercase mt-2 mx-auto bg-primary text-white w-full py-1 rounded-sm text-sm mb-3"
        disabled={!(value.from || value.to)}
        onClick={handleSubmit}>
        Áp dụng
      </Button>
    </section>
  )
}

export default CategoryFilterPrice
