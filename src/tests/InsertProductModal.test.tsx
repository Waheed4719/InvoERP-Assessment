/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import InsertProductModal from '../components/InsertProductModal'
import { message } from 'antd'

// Tests done
// * should render the modal
// * should update form input values when changed
// * should call onOk with form inputs when submitted
// * should display validation error message on failed submission
// * should call onCancel when the modal is canceled

describe('InsertProductModal Tests', () => {
  it('should render the modal', () => {
    render(
      <InsertProductModal open={true} onCancel={() => {}} onOk={() => {}} />
    )

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

  it('should call onCancel when the modal is canceled', () => {
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
})
