export function checkIfValidId(str?: string) {
  if (!str) return false
  // Regular expression to check if string is a valid url slug
  const regexExp = /^[0-9a-fA-F]{24}$/g

  return regexExp.test(str)
}
