import React from 'react'
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import { ProductType } from '../types'

export const Step: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { product, step = '0' } = useParams<{
    product: ProductType
    step: string
  }>()
  const baseUrl = useLocation().pathname.split('/')[1]

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newSearchParams = new URLSearchParams(searchParams)

    for (const [key, val] of formData.entries()) {
      if (typeof val === 'string') {
        newSearchParams.set(key, val)
      }
    }

    navigate(
      `/${[baseUrl, product, Number.parseInt(step) + 1].join(
        '/'
      )}?${newSearchParams.toString()}`
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}

      <button type="submit">Next</button>
    </form>
  )
}
