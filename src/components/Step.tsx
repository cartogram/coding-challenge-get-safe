import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {ProductType} from '../types'

interface StepProps {
  children: React.ReactNode
}

export const Step: React.FC<StepProps> = ({  children }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { product, step = '0' } = useParams<{
    product: ProductType
    step: string
  }>()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const newSearchParams = new URLSearchParams(searchParams)

    for (const [key, val] of formData.entries()) {
      if (typeof val === 'string') {
        newSearchParams.set(key, val)
      }
    }

    const next = `/${product}/${Number.parseInt(step) + 1}`
    navigate(`${next}?${newSearchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}

      <button type="submit">Next</button>
    </form>
  )
}
