export interface Data {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
}

export async function save(data: Data) {
  const newData = {
    ...data,
    id: data.id ?? Math.random().toString(36).substring(2, 9),
  }

  return localStorage.setItem('getsafe-buyer', JSON.stringify(newData))
}
export async function clear() {
  return localStorage.removeItem('getsafe-buyer')
}

export async function get() {
  let flow = await localStorage.getItem('getsafe-buyer')

  if (!flow) {
    return null
  }

  try {
    return JSON.parse(flow)
  } catch (e) {
    return null
  }
}
