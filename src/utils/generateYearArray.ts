export function generateYearArray(startYear: number) {
  const currentYear = new Date().getFullYear()
  const result = []

  for (let year = startYear; year <= currentYear; year++) {
    result.unshift(year)
  }

  return result
}
