import { AUTH } from '@/constants'
import { authUtils } from '@/utils'

export const saveSearchHistory = (value: string) => {
  const history: string[] | null = authUtils.getItem(AUTH.SEARCH_HISTORY)
  if (history) {
    const newHistory = history.slice()
    if (newHistory.includes(value)) {
      return
    }

    if (newHistory.length < 5) {
      newHistory.unshift(value)
    } else {
      newHistory.unshift(value)
      newHistory.pop()
    }
    authUtils.setItem(AUTH.SEARCH_HISTORY, newHistory)
  } else {
    authUtils.setItem(AUTH.SEARCH_HISTORY, [value])
  }
}
