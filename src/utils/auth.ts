import { AUTH } from '@/constants'

export const setAccessToken = (token: string) => {
  window.localStorage.setItem(AUTH.ACCESS_TOKEN, token)
}

export const getAccessToken = () => {
  return window.localStorage.getItem(AUTH.ACCESS_TOKEN)
}

export const removeAccessToken = () => {
  window.localStorage.removeItem(AUTH.ACCESS_TOKEN)
}
