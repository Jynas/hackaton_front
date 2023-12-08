const token = 'token' as string
export const getToken = (): string | null => {
  return window.localStorage.getItem(token)
}
export const saveToken =
  (token: string): void => {
    window.localStorage.setItem(token, token)
  }
export const destroyToken = (): void => {
  window.localStorage.removeItem(token)
}
export default { getToken, saveToken, destroyToken }
