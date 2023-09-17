/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement } from 'react'
import { MockedResponse, MockedProvider, wait } from '@apollo/client/testing'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import InsertProductModal from '../components/InsertProductModal'
import { message } from 'antd'
import Products from '../Products'
import {
  mutationMocks,
  queryMocks,
  refetchQueryMock,
} from '../lib/graphql/mocks' // Import your GraphQL query
import userEvent from '@testing-library/user-event'

// Tests done
// * should render the modal
// * should render the modal and close it
// * should render the modal and check if all inputs are present
// * should update form input values when changed
// * should call onOk with form inputs when submitted
// * should display validation error message on failed submission
// * should call onCancel when the modal is canceled
// * should insert a product and refetch data to add to the table

type RenderWithMockedProviderOptions = {
  mocks: MockedResponse[]
  addTypename?: boolean
}

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

describe('InsertProductModal Component Tests', () => {
  it('should render the modal', () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    const openModalButton = screen.getByTestId('open-add-product-modal-button')
    fireEvent.click(openModalButton)

    // Check if the modal is rendered
    const modal = screen.getByTestId('insert-product-modal')
    expect(modal).toBeInTheDocument()

    // Check if input fields are present
    const nameInput = screen.getByTestId('name-input')
    expect(nameInput).toBeInTheDocument()
  })

  it('should render the modal and close it', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    const openModalButton = screen.getByTestId('open-add-product-modal-button')
    await act(() => {
      userEvent.click(openModalButton)
    })

    // Check if the modal is rendered
    const modal = screen.getByTestId('insert-product-modal')
    await waitFor(() => {
      expect(modal).toBeInTheDocument()
    })
    // Check if input fields are present
    const nameInput = screen.getByTestId('cancel-add-product')
    await act(() => {
      userEvent.click(nameInput)
    })

    await waitFor(() => {
      expect(modal).not.toBeInTheDocument()
    })
  })

  it('should render the modal and check if all inputs are present', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    }
    renderWithMockedProvider(<Products />, mockedProvideroptions)

    const openModalButton = screen.getByTestId('open-add-product-modal-button')
    await act(() => {
      userEvent.click(openModalButton)
    })
    // Check if the modal is rendered
    await waitFor(() => {
      const modal = screen.getByTestId('insert-product-modal')
      expect(modal).toBeInTheDocument()
    })
    // Check if the modal title is present
    const modalTitle = screen.getByText('Add New Product')
    expect(modalTitle).toBeInTheDocument()

    // Check if input fields are present
    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')
    const stockInput = screen.getByTestId('stock-input')
    const priceInput = screen.getByTestId('price-input')

    expect(nameInput).toBeInTheDocument()
    expect(descriptionInput).toBeInTheDocument()
    expect(stockInput).toBeInTheDocument()
    expect(priceInput).toBeInTheDocument()
  })

  it('should update form input values when changed', async () => {
    const mockOnOk = jest.fn()
    const mockOnCancel = jest.fn()
    const { getByTestId } = render(
      <InsertProductModal open={true} onCancel={mockOnCancel} onOk={mockOnOk} />
    )

    // Fill in form inputs
    const nameInput = getByTestId('name-input')
    const descriptionInput = getByTestId('description-input')
    await act(() => {
      fireEvent.change(nameInput, { target: { value: 'Test Name' } })
      fireEvent.change(descriptionInput, {
        target: { value: 'Test Description' },
      })
    })
    await waitFor(() => {
      expect(nameInput).toHaveValue('Test Name')
      expect(descriptionInput).toHaveValue('Test Description')
    })
  })

  it('should call onOk with form inputs when submitted', async () => {
    const mockOnOk = jest.fn()
    const mockOnCancel = jest.fn()
    const { getByTestId } = render(
      <InsertProductModal open={true} onCancel={mockOnCancel} onOk={mockOnOk} />
    )

    // Fill in form inputs
    const nameInput = getByTestId('name-input')
    const descriptionInput = getByTestId('description-input')
    const stockInput = getByTestId('stock-input')
    const priceInput = getByTestId('price-input')
    await act(() => {
      fireEvent.change(nameInput, { target: { value: 'Test Name' } })
      fireEvent.change(descriptionInput, {
        target: { value: 'Test Description' },
      })
      fireEvent.change(stockInput, { target: { value: '10' } })
      fireEvent.change(priceInput, { target: { value: '9.99' } })
    })
    // Click the "Add Product" button in the modal to submit
    const modalSubmitButton = getByTestId('add-product')
    await act(() => {
      fireEvent.click(modalSubmitButton)
    })
    // Wait for the form submission to settle
    await waitFor(() => {
      // Check if onOk was called with the expected form inputs
      expect(mockOnOk).toHaveBeenCalledWith({
        name: 'Test Name',
        description: 'Test Description',
        stock: 10,
        price: 9.99,
      })
    })
  })

  it('should display validation error message on failed submission', async () => {
    const mockOnOk = jest.fn()
    const mockOnCancel = jest.fn()
    const { getByTestId } = render(
      <InsertProductModal open={true} onCancel={mockOnCancel} onOk={mockOnOk} />
    )
    // Create a spy/mock for the message.error method
    const messageErrorSpy = jest.spyOn(message, 'error')
    // Fill in form inputs with invalid data (e.g., leaving name and description empty)
    const nameInput = getByTestId('name-input')
    const descriptionInput = getByTestId('description-input')
    const stockInput = getByTestId('stock-input')
    const priceInput = getByTestId('price-input')
    await act(() => {
      fireEvent.change(nameInput, { target: { value: '' } })
      fireEvent.change(descriptionInput, { target: { value: '' } })
      fireEvent.change(stockInput, { target: { value: '10' } })
      fireEvent.change(priceInput, { target: { value: '9.99' } })
    })
    // Click the "Add Product" button in the modal to submit
    const modalSubmitButton = getByTestId('add-product')
    await act(() => {
      fireEvent.click(modalSubmitButton)
    })
    // Wait for the form submission and validation to settle
    await waitFor(() => {
      // Check if a validation error message is displayed for the name input
      const nameError = screen.getByText('Please enter a name')
      expect(nameError).toBeInTheDocument()

      // Check if a validation error message is displayed for the description input
      const descriptionError = screen.getByText('Please enter a description')
      expect(descriptionError).toBeInTheDocument()

      // Ensure that onOk was not called since the form submission failed
      expect(mockOnOk).not.toHaveBeenCalled()
      expect(messageErrorSpy).toHaveBeenCalled()
    })
  })

  it('should call onCancel when the modal is cancelled', () => {
    const mockOnOk = jest.fn()
    const mockOnCancel = jest.fn()
    const { getByTestId } = render(
      <InsertProductModal open={true} onCancel={mockOnCancel} onOk={mockOnOk} />
    )

    // Click the "Cancel" button in the modal
    const modalCancelButton = getByTestId('cancel-add-product')
    fireEvent.click(modalCancelButton)

    // Check if onCancel was called
    expect(mockOnCancel).toHaveBeenCalled()
  })

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
