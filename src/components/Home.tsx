import React from 'react'
import { Link, useLoaderData, LoaderFunctionArgs } from 'react-router-dom'

export function loader({ request }: LoaderFunctionArgs) {
  const search = new URL(request.url).searchParams

  if (search.get('success')) {
    return {
      message: `Thank you for your purchase!`,
    }
  }

  return {}
}

export const Home: React.FC = () => {
  const flashData = useLoaderData() as ReturnType<typeof loader>

  const flashMessage = flashData?.message ? (
    <p className="Flash">{flashData.message}</p>
  ) : null

  return (
    <>
      {flashMessage}
      <section className="Hero">
        <h1>Welcome to Getsafe's Insurance</h1>
        <p>Choose an insurance plan to get started.</p>
        <nav className="Nav">
          <Link to="/buy/developer-insurance">Deverloper insurance</Link>
          <Link to="/buy/designer-insurance">Designer insurance</Link>
        </nav>
      </section>
    </>
  )
}
