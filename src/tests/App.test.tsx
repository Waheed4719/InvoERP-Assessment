import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders Application name', () => {
  render(<App />)
  const linkElement = screen.getByText(/Inventory App/i)
  expect(linkElement).toBeInTheDocument()
})
