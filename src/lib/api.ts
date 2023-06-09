import { CachedData } from '../types'

export function save(data: CachedData) {
  const previousData = get()
  const newData = {
    ...previousData,
    ...data,
  }

  return localStorage.setItem('getsafe-buyer', JSON.stringify(newData))
}
export async function clear() {
  return localStorage.removeItem('getsafe-buyer')
}

export function get() {
  const flow = localStorage.getItem('getsafe-buyer')

  if (!flow) {
    return null
  }

  try {
    return JSON.parse(flow)
  } catch (e) {
    return null
  }
}
