import React from 'react'
import { useNavigate } from 'react-router-dom'

interface StepProps {
  children: React.ReactNode
  next: string
}

export const Step: React.FC<StepProps> = ({ next, children }) => {
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    console.log(navigate, username)
    navigate(next)
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <button type="submit">Next</button>
    </form>
  )
}
