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
    parseNumbers: true,
    arrayFormat: 'comma'
  })

  params.forEach(({ name, value }) => {
    paramsObject[name] = value
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
    searchParams.append(name, value.toString())

    paramsObject = queryString.parse(searchParams.toString(), {
      parseNumbers: true
    })
  } else {
    paramsObject = queryString.parse(searchParams.toString(), {
      parseNumbers: true,
      arrayFormat: 'comma'
    }) //=> {foo: [1, 2, 3]}

    const typeParams = paramsObject[name]
    if (typeParams && typeof typeParams == 'object') {
      paramsObject[name] = typeParams.filter((val) => val !== +value)
    } else {
      paramsObject[name] = ''
    }
  }

  // Reset page
  paramsObject.page = 0

  const newParamsObject = queryString.stringify(paramsObject, {
    arrayFormat: 'comma',
    skipNull: true,
    skipEmptyString: true
  })

  return newParamsObject
}
