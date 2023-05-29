import React from 'react'
import { Link } from 'react-router-dom'

export const Home: React.FC = () => {
  return (
    <section className="Hero">
      <h1>Welcome to Getsafe's Insurance</h1>
      <p>Choose an insurance plan to get started.</p>
      <nav className="Nav">
        <Link to="/buy/developer-insurance">Deverloper insurance</Link>
        <Link to="/buy/designer-insurance">Designer insurance</Link>
      </nav>
    </section>
  )
}
