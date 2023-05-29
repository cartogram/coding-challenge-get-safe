import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import logo from '../images/logo.svg'

export const Layout: React.FC = () => {
  return (
    <>
      <header className="Header">
        <Link to="/">
          <img src={logo} className="Logo" alt="Getsafe Logo" />
        </Link>
      </header>
      <div className="Container">
        <Outlet />
      </div>
    </>
  )
}
