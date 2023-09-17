/* eslint-disable @typescript-eslint/no-empty-function */
import { screen, waitFor, act, fireEvent } from '@testing-library/react'
import Products from '../Products'
import { queryPaginationMock } from '../lib/graphql/mocks' // Import your GraphQL query
import { renderWithMockedProvider } from './ReusableFunctions'

// Tests Done
// * Check if the number of page in table page is correct or not based on total products count
// * Check if pagination works

describe('Pagination Functionality Test', () => {
  it('Check if the number of page in table page is correct or not based on total products count', async () => {
    const mockedProvideroptions = {
      mocks: queryPaginationMock,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    const productCount = screen.getByTestId('products-count')
    await waitFor(() => {
      expect(productCount).toHaveTextContent('15')
    })
    const table = screen.getByTestId('products-table')

    expect(table).toBeInTheDocument()

    const container = screen.getByTestId('container')
    expect(container).toBeInTheDocument()
    const paginationItems = container.getElementsByClassName(
      'ant-pagination-item'
    )
    await waitFor(() => {
      expect(paginationItems.length).toBe(3)
    })
  })

  it('Check if pagination works', async () => {
    const mockedProvideroptions = {
      mocks: queryPaginationMock,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    const productCount = screen.getByTestId('products-count')
    await waitFor(() => {
      expect(productCount).toHaveTextContent('15')
    })
    const table = screen.getByTestId('products-table')

    expect(table).toBeInTheDocument()

    const productItem1 = screen.getByText('Mercedes')

    await waitFor(() => {
      expect(productItem1).toBeInTheDocument()
    })

    const container = screen.getByTestId('container')
    expect(container).toBeInTheDocument()
    const paginationItems = container.getElementsByClassName(
      'ant-pagination-item'
    )
    await waitFor(() => {
      expect(paginationItems.length).toBe(3)
    })

    const nextButton = container.getElementsByClassName(
      'ant-pagination-next'
    )[0]
    await act(() => {
      fireEvent.click(nextButton)
    })

    await waitFor(() => {
      const productItem = screen.getByText('Chevrolet Silverado')
      expect(productItem).toBeInTheDocument()
    })

    const prevButton = container.getElementsByClassName(
      'ant-pagination-prev'
    )[0]
    await act(() => {
      fireEvent.click(prevButton)
    })

    const productItem = screen.getByText('Mercedes')
    await waitFor(() => {
      expect(productItem).toBeInTheDocument()
    })
  })
})
