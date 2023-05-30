import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'

export const Summary: React.FC = () => {
  const [searchParams] = useSearchParams()

  return (
    <>
      Summary <pre>{searchParams.toString()}</pre>
      <Link to="/purchased">Purchase</Link>
    </>
  )
}
