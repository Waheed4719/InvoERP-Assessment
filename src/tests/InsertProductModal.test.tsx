/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import InsertProductModal from '../components/InsertProductModal'
import { message } from 'antd'
import Products from '../Products'
import { queryMocks } from '../lib/graphql/mocks' // Import your GraphQL query
import userEvent from '@testing-library/user-event'
import { renderWithMockedProvider } from './ReusableFunctions'

// Tests done
// * should render the modal
// * should render the modal and close it
// * should render the modal and check if all inputs are present
// * should update form input values when changed
// * should display validation error message on failed submission
// * should call onOk with form inputs when submitted
// * should call onCancel when the modal is canceled

type FormInputObject = {
  [key: string]: HTMLElement // Adjust the type as needed
}

type FormValues = {
  [key: string]: string | number
}

const openModal = async () => {
  const mockedProvideroptions = {
    mocks: queryMocks,
    addTypename: false,
  }
  renderWithMockedProvider(<Products />, mockedProvideroptions)

  const openModalButton = screen.getByTestId('open-add-product-modal-button')
  await act(() => {
    userEvent.click(openModalButton)
  })
}

const getFormInputs = async () => {
  const nameInput = screen.getByTestId('name-input')
  const descriptionInput = screen.getByTestId('description-input')
  const stockInput = screen.getByTestId('stock-input')
  const priceInput = screen.getByTestId('price-input')

  return {
    nameInput,
    descriptionInput,
    stockInput,
    priceInput,
  }
}

const changeFormInputs = async (
  formInputs: FormInputObject,
  values: FormValues
) => {
  await act(() => {
    Object.entries(formInputs).forEach(([inputName, inputElement]) => {
      const inputValue = values[inputName]
      fireEvent.change(inputElement, { target: { value: inputValue } })
    })
  })
}

describe('InsertProductModal Component Tests', () => {
  it('should render the modal', () => {
    openModal()
    // Check if the modal is rendered
    const modal = screen.getByTestId('insert-product-modal')
    expect(modal).toBeInTheDocument()

    // Check if input fields are present
    const nameInput = screen.getByTestId('name-input')
    expect(nameInput).toBeInTheDocument()
  })

  it('should render the modal and close it', async () => {
    openModal()
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
    openModal()
    // Check if the modal is rendered
    await waitFor(() => {
      const modal = screen.getByTestId('insert-product-modal')
      expect(modal).toBeInTheDocument()
    })
    // Check if the modal title is present
    const modalTitle = screen.getByText('Add New Product')
    expect(modalTitle).toBeInTheDocument()

    const FormInputs = await getFormInputs()

    // Check if input fields are present
    Object.entries(FormInputs).forEach(([_, inputElement]) => {
      expect(inputElement).toBeInTheDocument()
    })
  })

  it('should update form input values when changed', async () => {
    openModal()
    // Check if the modal is rendered
    await waitFor(() => {
      const modal = screen.getByTestId('insert-product-modal')
      expect(modal).toBeInTheDocument()
    })

    // Fill in form inputs
    const nameInput = screen.getByTestId('name-input')
    const descriptionInput = screen.getByTestId('description-input')

    await changeFormInputs(
      { nameInput, descriptionInput },
      {
        nameInput: 'Test Name',
        descriptionInput: 'Test Description',
      }
    )

    await waitFor(() => {
      expect(nameInput).toHaveValue('Test Name')
      expect(descriptionInput).toHaveValue('Test Description')
    })
  })

  it('should display validation error message on failed submission', async () => {
    openModal()
    // Check if the modal is rendered
    await waitFor(() => {
      const modal = screen.getByTestId('insert-product-modal')
      expect(modal).toBeInTheDocument()
    })
    // Create a spy/mock for the message.error method
    const messageErrorSpy = jest.spyOn(message, 'error')

    const { nameInput, descriptionInput, stockInput, priceInput } =
      await getFormInputs()

    // Fill in form inputs with invalid data (e.g., leaving name and description empty)
    await changeFormInputs(
      { nameInput, descriptionInput, stockInput, priceInput },
      {
        nameInput: '',
        descriptionInput: '',
        stockInput: 10,
        priceInput: 9.99,
      }
    )
    // Click the "Add Product" button in the modal to submit
    const modalSubmitButton = screen.getByTestId('add-product')
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

      expect(messageErrorSpy).toHaveBeenCalled()
    })
  })

  // testing the onOk mock function
  it('should call onOk with form inputs when submitted', async () => {
    const mockOnOk = jest.fn()
    const mockOnCancel = jest.fn()
    const { getByTestId } = render(
      <InsertProductModal open={true} onCancel={mockOnCancel} onOk={mockOnOk} />
    )

    const { nameInput, descriptionInput, stockInput, priceInput } =
      await getFormInputs()

    // Fill in form inputs
    await changeFormInputs(
      { nameInput, descriptionInput, stockInput, priceInput },
      {
        nameInput: 'Test Name',
        descriptionInput: 'Test Description',
        stockInput: 10,
        priceInput: 9.99,
      }
    )

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
  // testing the onCancel mock function
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
})
