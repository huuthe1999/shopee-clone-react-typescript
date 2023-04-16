export const setItem = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
  const item = window.localStorage.getItem(key)
  return JSON.parse(JSON.stringify(item))
}

export const removeItem = (key: string) => {
  window.localStorage.removeItem(key)
}
