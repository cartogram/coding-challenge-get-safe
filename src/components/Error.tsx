import React from 'react'
import { useRouteError } from 'react-router-dom'

export const Error: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  return (
    <section className="Error">
      <p>Something went wrong.</p>
    </section>
  )
}
