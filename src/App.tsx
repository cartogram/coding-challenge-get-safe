import { Routes, Route } from 'react-router-dom'

import { Layout } from './components/Layout'
import { NotFound } from './components/NotFound'
import { Home } from './components/Home'
import { Product } from './components/Product'
import { BuyFlow } from './components/BuyFlow'

import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/buy" element={<BuyFlow />}>
          <Route path=":product/:step?" element={<Product />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
