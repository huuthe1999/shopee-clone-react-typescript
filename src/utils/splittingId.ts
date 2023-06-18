import { checkIfValidId } from '@/utils'

export function splittingId(value?: string) {
  if (!value) return undefined

  const id = value.substring(value.lastIndexOf('-') + 1)
  return checkIfValidId(id) ? id : undefined
}
