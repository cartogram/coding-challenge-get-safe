import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { Home } from './components/Home'
import {
  Products,
  loader as ProductLoader,
  action as ProductAction,
} from './components/Product'
import { BuyFlow } from './components/BuyFlow'
import { Error } from './components/Error'

import './App.css'

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          Component: Layout,
          errorElement: <Error />,
          children: [
            {
              index: true,
              Component: Home,
            },
            {
              path: 'buy/:product',
              Component: Products,
              loader: ProductLoader,
              action: ProductAction,
            },
            {
              path: '*',
              Component: NotFound,
            },
          ],
        },
      ])}
      fallbackElement={<p>Loading...</p>}
    />
  )
}

export default App
