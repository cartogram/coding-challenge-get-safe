import { act } from 'react-dom/test-utils'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
  describe('/', () => {
    it('renders the home page', async () => {
      await renderWithRouter(<App />, { route: '/' })
      const headerElement = screen.getByText(/Welcome to Getsafe's Insurance/i)
      expect(headerElement).toBeInTheDocument()
    })

    it('renders the success message', async () => {
      await renderWithRouter(<App />, {
        route: '/?success=true&product=developer-insurance',
      })
      const headerElement = screen.getByText(/Thank you for your purchase!/i)
      expect(headerElement).toBeInTheDocument()
    })
  })

  describe('/buy/developer-insurance', () => {
    it('renders the developer insurance', async () => {
      await renderWithRouter(<App />, { route: '/buy/developer-insurance' })
      const headerElement = screen.getByText(/Developer Insurance/i)
      expect(headerElement).toBeInTheDocument()
    })

    it('renders the age field on the first step', async () => {
      await renderWithRouter(<App />, { route: '/buy/developer-insurance' })
      const emailField = screen.getByLabelText('Age')
      expect(emailField).toBeInTheDocument()
    })

    it('renders the email field on the second step', async () => {
      await renderWithRouter(<App />, {
        route: '/buy/developer-insurance?step=1',
      })
      const ageField = screen.getByLabelText('Email')
      expect(ageField).toBeInTheDocument()
    })

    it('renders the summary on the last step', async () => {
      await renderWithRouter(<App />, {
        route: '/buy/developer-insurance?step=2',
      })
      const summaryElement = screen.getByText('You are buying')
      expect(summaryElement).toBeInTheDocument()
    })
  })

  describe('/buy/designer-insurance', () => {
    it('renders the designer insurance', async () => {
      await renderWithRouter(<App />, { route: '/buy/designer-insurance' })
      const headerElement = screen.getByText(/Designer Insurance/i)
      expect(headerElement).toBeInTheDocument()
    })

    it('renders the age field on the first step', async () => {
      await renderWithRouter(<App />, { route: '/buy/designer-insurance' })
      const emailField = screen.getByLabelText('Age')
      expect(emailField).toBeInTheDocument()
    })

    it('renders the email field on the second step', async () => {
      await renderWithRouter(<App />, {
        route: '/buy/designer-insurance?step=1',
      })
      const emailField = screen.getByLabelText('Email')
      expect(emailField).toBeInTheDocument()
    })

    it('renders the name fields on the third step', async () => {
      await renderWithRouter(<App />, {
        route: '/buy/designer-insurance?step=2',
      })
      const firstNameField = screen.getByLabelText('First Name')
      const lastNameField = screen.getByLabelText('Last Name')
      expect(firstNameField).toBeInTheDocument()
      expect(lastNameField).toBeInTheDocument()
    })

    it('renders the summary on the last step', async () => {
      await renderWithRouter(<App />, {
        route: '/buy/designer-insurance?step=3',
      })
      const summaryElement = screen.getByText('You are buying')
      expect(summaryElement).toBeInTheDocument()
    })
  })

  describe('/not-found', () => {
    it('renders the not found page', async () => {
      await renderWithRouter(<App />, { route: '/not-found' })
      const headerElement = screen.getByText(/Page not found/i)
      expect(headerElement).toBeInTheDocument()
    })
  })
})

const renderWithRouter = async (
  ui: Parameters<typeof render>[0],
  { route = '/' } = {}
) => {
  await act(async () => {
    await window.history.pushState({}, 'Test page', route)

    return {
      user: userEvent.setup(),
      ...render(ui),
    }
  })
}
