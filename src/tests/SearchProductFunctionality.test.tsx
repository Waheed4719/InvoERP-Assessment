/* eslint-disable @typescript-eslint/no-empty-function */
import { wait } from '@apollo/client/testing'
import { screen, waitFor, fireEvent, act } from '@testing-library/react'
import Products from '../Products'
import { queryMocks } from '../lib/graphql/mocks' // Import your GraphQL query
import { renderWithMockedProvider } from './ReusableFunctions'

// Tests Done
// * should search a product and check if the product is found and whether the product count is 1 or not
// * should search a product by an unavailable name and check if the product count is 0 or not

describe('Search Product Functionality Test', () => {
  it('should search a product and check if the product is found and check if the product count is 1 or not', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    const { getByTestId } = renderWithMockedProvider(
      <Products />,
      mockedProvideroptions
    )

    const searchBar = getByTestId('search-bar')
    await act(() => {
      fireEvent.change(searchBar, { target: { value: 'Mer' } })
    })

    wait(0)
    const productCount = getByTestId('products-count')
    await waitFor(() => {
      expect(productCount).toHaveTextContent('1')
      expect(screen.getByText('Mercedes')).toBeInTheDocument()
    })
  })

  it('should search a product by an unavailable name and check if the product count is 0 or not', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    const { getByTestId } = renderWithMockedProvider(
      <Products />,
      mockedProvideroptions
    )

    const searchBar = getByTestId('search-bar')
    await act(() => {
      fireEvent.change(searchBar, { target: { value: 'Spider' } })
    })

    wait(0)
    const productCount = getByTestId('products-count')
    await waitFor(() => {
      expect(productCount).toHaveTextContent('0')
    })
  })
})
