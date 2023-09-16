import { render, screen } from '@testing-library/react'
import App from '../App'

// Tests done
// * should render Application name

test('renders Application name', () => {
  render(<App />)
  const linkElement = screen.getByText(/Inventory App/i)
  expect(linkElement).toBeInTheDocument()
})
