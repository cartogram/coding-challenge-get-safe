import React from 'react'
import { Outlet } from 'react-router-dom'

export const BuyFlow: React.FC = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="BuyFlow">
      <h2>Buy Flow</h2>
      <Outlet />
    </section>
  )
}
