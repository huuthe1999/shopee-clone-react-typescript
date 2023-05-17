import queryString from 'query-string'

export type SearchParamsProps = {
  name: string
  value: string | number
  check: boolean
}

export const formatSearchParamUrl = ({
  searchParams,
  params
}: {
  searchParams: URLSearchParams
  params: Omit<SearchParamsProps, 'check'>[]
}) => {
  const paramsObject = queryString.parse(searchParams.toString(), {
    arrayFormat: 'comma'
  })

  params.forEach(({ name, value }) => {
    paramsObject[name] = value.toString()
  })

  const newParamsObject = queryString.stringify(paramsObject, {
    arrayFormat: 'comma',
    skipNull: true,
    skipEmptyString: true
  })
  return newParamsObject
}

// Ex: ?order=desc&page=1&sortBy=price
// ==> Add locations=5,6 ==> ? locations=5%2C6&order=desc&page=1&sortBy=price
// ==> Remove 6 from locations ==> ? locations=5&order=desc&page=1&sortBy=price

export const formatCommaSearchParamUrl = ({
  searchParams,
  params: { name, value, check }
}: {
  searchParams: URLSearchParams
  params: SearchParamsProps
}) => {
  let paramsObject
  if (check) {
    // Nếu checkbox:true ==> Thêm param vào URLSearchParams
    if (name === 'ratingFilter') {
      searchParams.set(name, value.toString())
    } else {
      searchParams.append(name, value.toString())
    }

    paramsObject = queryString.parse(searchParams.toString())
  } else {
    paramsObject = queryString.parse(searchParams.toString(), {
      arrayFormat: 'comma'
    }) // => {foo: [1, 2, 3]}

    // Loại bỏ param uncheck
    const typeParams = paramsObject[name] || []
    paramsObject[name] =
      Array.isArray(typeParams) && name !== 'ratingFilter'
        ? typeParams.filter((val) => val !== value)
        : ''
  }

  // Reset page
  paramsObject.page = '0'

  const newParamsObject = queryString.stringify(paramsObject, {
    arrayFormat: 'comma',
    skipNull: true,
    skipEmptyString: true
  })

  return newParamsObject
}
