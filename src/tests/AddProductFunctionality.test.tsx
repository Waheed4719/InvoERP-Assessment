/* eslint-disable @typescript-eslint/no-empty-function */
import { wait } from '@apollo/client/testing'
import { screen, waitFor, fireEvent, act } from '@testing-library/react'
import { message } from 'antd'
import Products from '../Products'
import {
  mutationMocks,
  queryMocks,
  refetchQueryMock,
} from '../lib/graphql/mocks' // Import your GraphQL query
import userEvent from '@testing-library/user-event'
import { renderWithMockedProvider } from './ReusableFunctions'

// Tests Done
// * should insert a product and refetch data to add to the table

describe('Add Product Functionality Test', () => {
  it('should insert a product and refetch data to add to the table', async () => {
    const mockedProvideroptions = {
      mocks: [...queryMocks, ...mutationMocks, ...refetchQueryMock],
      addTypename: false,
    }
    const { getByTestId } = renderWithMockedProvider(
      <Products />,
      mockedProvideroptions
    )

    const productCount = screen.getByTestId('products-count')
    await waitFor(() => {
      expect(productCount).toHaveTextContent('2')
    })

    const openModalButton = screen.getByTestId('open-add-product-modal-button')
    fireEvent.click(openModalButton)
    const messageSuccessSpy = jest.spyOn(message, 'success')
    // Check if the modal is rendered
    const modal = screen.getByTestId('insert-product-modal')
    expect(modal).toBeInTheDocument()

    // Fill in form inputs
    const nameInput = getByTestId('name-input')
    const descriptionInput = getByTestId('description-input')
    const stockInput = getByTestId('stock-input')
    const priceInput = getByTestId('price-input')
    const { name, description, price, stock } =
      mutationMocks[0].request.variables
    await act(() => {
      fireEvent.change(nameInput, { target: { value: name } })
      fireEvent.change(descriptionInput, {
        target: { value: description },
      })
      fireEvent.change(stockInput, { target: { value: stock } })
      fireEvent.change(priceInput, { target: { value: price } })
    })
    // Click the "Add Product" button in the modal to submit
    const modalSubmitButton = getByTestId('add-product')
    await act(() => {
      userEvent.click(modalSubmitButton)
    })

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument()
    })

    // add a timeout to wait for the mutation to settle
    await wait(0)

    // Wait for the form submission to settle
    await waitFor(async () => {
      expect(messageSuccessSpy).toHaveBeenCalled()
      expect(productCount).toHaveTextContent('3')
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })
})
