import { ReactElement } from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing'; // Import MockedProvider
import { queryMocks } from '../lib/graphql/mocks'; // Import your GraphQL query
import Products from '../Products';
import InsertProductModal from '../components/InsertProductModal';

type RenderWithMockedProviderOptions = {
  mocks: MockedResponse[];
  addTypename?: boolean;
};

// Reusable function to render a component with MockedProvider
const renderWithMockedProvider = (
  component: ReactElement,
  options: RenderWithMockedProviderOptions,
) => {
  const { mocks, addTypename } = options;
  return render(
    <MockedProvider mocks={mocks} addTypename={addTypename}>
      {component}
    </MockedProvider>,
  );
};

// Group the tests using the describe block
describe('Products Component Tests', () => {
  test('should render Products page title', () => {
    render(<Products />);
    const titleElement = screen.getByText('Products', { selector: 'h2' });
    expect(titleElement).toBeInTheDocument();
  });
  test('should render Products page title after querying GraphQL', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    };
    renderWithMockedProvider(<Products />, mockedProvideroptions);

    await waitFor(() => {
      const titleElement = screen.getByText('Products', { selector: 'h2' });
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('should render Products after querying GraphQL', async () => {
    const mockedProvideroptions = {
      mocks: queryMocks,
      addTypename: false,
    };
    renderWithMockedProvider(<Products />, mockedProvideroptions);

    await waitFor(() => {
      const product1 = screen.getByText('Banana');
      // Add more assertions for other products as needed
      expect(product1).toBeInTheDocument();
    });
  });
});

describe('InsertProductModal Tests', () => {
  it('should render the modal', () => {
    render(
      <InsertProductModal open={true} onCancel={() => {}} onOk={() => {}} />,
    );

    // Check if the modal title is present
    const modalTitle = screen.getByText('Add New Product');
    expect(modalTitle).toBeInTheDocument();

    // Check if input fields are present
    const nameInput = screen.getByTestId('name-input');
    const descriptionInput = screen.getByTestId('description-input');
    const stockInput = screen.getByTestId('stock-input');
    const priceInput = screen.getByTestId('price-input');

    expect(nameInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(stockInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
  });

  test('should update form input values when changed', () => {
    render(
      <InsertProductModal open={true} onCancel={() => {}} onOk={() => {}} />,
    );

    const nameInput = screen.getByTestId('name-input');
    const descriptionInput = screen.getByTestId('description-input');

    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'New Description' },
    });

    expect(nameInput).toHaveValue('New Name');
    expect(descriptionInput).toHaveValue('New Description');
  });

  it('should call onOk with form inputs when submitted', async () => {
    const mockOnOk = jest.fn();
    render(
      <InsertProductModal open={true} onCancel={() => {}} onOk={mockOnOk} />,
    );

    // Fill in form inputs
    const nameInput = screen.getByTestId('name-input');
    const descriptionInput = screen.getByTestId('description-input');
    const stockInput = screen.getByTestId('stock-input');
    const priceInput = screen.getByTestId('price-input');

    fireEvent.change(nameInput, { target: { value: 'Test Name' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Test Description' },
    });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(priceInput, { target: { value: 9.99 } });

    // Click the "Add Product" button in the modal to submit
    const modalSubmitButton = screen.getByText('Add Product');
    fireEvent.click(modalSubmitButton);

    // Wait for the form submission to settle
    await waitFor(() => {
      // Check if onOk was called with the expected form inputs
      expect(mockOnOk).toHaveBeenCalledWith({
        name: 'Test Name',
        description: 'Test Description',
        stock: 10,
        price: 9.99,
      });
    });
  });

  it('should call onCancel when the modal is canceled', () => {
    const mockOnCancel = jest.fn();
    render(
      <InsertProductModal
        open={true}
        onCancel={mockOnCancel}
        onOk={() => {}}
      />,
    );

    // Click the "Cancel" button in the modal
    const modalCancelButton = screen.getByText('Cancel');
    fireEvent.click(modalCancelButton);

    // Check if onCancel was called
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
