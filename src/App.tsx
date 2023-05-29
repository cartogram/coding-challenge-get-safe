import logo from './logo.svg'
import './App.css'
import Buyflow from './buyflow/Buyflow'
import { Routes, Route, Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/buy/insurance/:product" element={<Buyflow />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  )
}

function NoMatch() {
  return <p>Not found</p>
}

function Home() {
  return (
    <>
      <p>Welcome to Getsafe's Developer Insurance</p>
      <Link to="/buy/insurance/dev">Get started!</Link>

      <p>Welcome to Getsafe's Designer Insurance</p>
      <Link to="/buy/insurance/des">Get started!</Link>
    </>
  )
}

export default App
