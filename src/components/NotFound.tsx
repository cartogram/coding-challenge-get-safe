import React from 'react'
import { Link } from 'react-router-dom'

export const NotFound: React.FC = () => {
  return (
    <>
      <p>
        Page not found. <Link to="/">Go back home</Link>
      </p>
    </>
  )
}
