/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider, MockedResponse, wait } from '@apollo/client/testing' // Import MockedProvider
import { queryMocks } from '../lib/graphql/mocks' // Import your GraphQL query
import Products from '../Products'

type RenderWithMockedProviderOptions = {
  mocks: MockedResponse[]
  addTypename?: boolean
}

// Tests done
// * should render Products page title after querying GraphQL
// * should render Products after querying GraphQL
// * should show Products count after querying GraphQL

// Reusable function to render a component with MockedProvider
const renderWithMockedProvider = (
  component: ReactElement,
  options: RenderWithMockedProviderOptions
) => {
  const { mocks, addTypename } = options
  return render(
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      {component}
    </MockedProvider>
  )
}

// Group the tests using the describe block
describe('Products Component Tests', () => {
  test('should render Products page title after querying GraphQL', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    await waitFor(() => {
      const titleElement = screen.getByText('Products', { selector: 'h2' })
      expect(titleElement).toBeInTheDocument()
    })
  })

  test('should render Products after querying GraphQL', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    await waitFor(() => {
      const product1 = screen.getByText('Mercedes')
      // Add more assertions for other products as needed
      expect(product1).toBeInTheDocument()
    })
  })

  test('should show Products count after querying GraphQL', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)
    await waitFor(() => {
      const productCount = screen.getByTestId('products-count')
      expect(productCount).toHaveTextContent('2')
    })
  })
})
