import React from 'react'
import { Form } from 'react-router-dom'

export const Step: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Form method="post">
      {children}
      <button type="submit">Next</button>
    </Form>
  )
}
