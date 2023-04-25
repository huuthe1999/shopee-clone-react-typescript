export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value) // ==> "12.345 ₫"

  // Convert to ₫12.345
  return formatter.slice(-1).concat(formatter.slice(0, -2))
}
