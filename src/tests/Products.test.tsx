/* eslint-disable @typescript-eslint/no-empty-function */
import { screen, waitFor } from '@testing-library/react'
import { queryMocks } from '../lib/graphql/mocks' // Import your GraphQL query
import Products from '../Products'
import { renderWithMockedProvider } from './ReusableFunctions'

// Tests done
// * should render Products page title after querying GraphQL
// * should render Products after querying GraphQL
// * should show Products count after querying GraphQL

// Group the tests using the describe block
describe('Products Component Tests', () => {
  beforeEach(() => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)
  })
  test('should render Products page title after querying GraphQL', async () => {
    await waitFor(() => {
      const titleElement = screen.getByText('Products', { selector: 'h2' })
      expect(titleElement).toBeInTheDocument()
    })
  })

  test('should render Products after querying GraphQL', async () => {
    await waitFor(() => {
      const product1 = screen.getByText('Mercedes')
      expect(product1).toBeInTheDocument()
    })
  })

  test('should show Products count after querying GraphQL', async () => {
    await waitFor(() => {
      const productCount = screen.getByTestId('products-count')
      expect(productCount).toHaveTextContent(
        queryMocks[0].result.data.products.length.toString()
      )
    })
  })
})
