import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('renders learn react link', async () => {
  render(<App />)
  const linkElement = await screen.findAllByText(/Get started/i)
  expect(linkElement).toHaveLength(2)
})

test('renders the developer insurance', () => {
  renderWithRouter(<App />, { route: '/buy/insurance/dev' })
  const headerElement = screen.getByText(/Buying Developer Insurance/i)
  expect(headerElement).toBeInTheDocument()
})

test('renders the designer insurance', () => {
  renderWithRouter(<App />, { route: '/buy/insurance/des' })
  const headerElement = screen.getByText(/Buying Designer Insurance/i)
  expect(headerElement).toBeInTheDocument()
})

const renderWithRouter = (
  ui: Parameters<typeof render>[0],
  { route = '/' } = {}
) => {
  window.history.pushState({}, 'Test page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  }
}
