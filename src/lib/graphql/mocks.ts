import { DocumentNode } from 'graphql'
import { GET_PRODUCTS, GET_PRODUCTS_COUNT } from './queries'
import { Product } from '../../types'
import { INSERT_SINGLE_PRODUCT } from './mutations'

// Define types for the request and result objects
type MockRequest = {
  request: {
    query: DocumentNode
  }
  result: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any // Replace with the specific shape of your result data
  }
}

export const sample_products: Product[] = [
  {
    id: 1,
    name: 'Mercedes',
    description: 'A car',
    price: 23234.99,
    stock: 150,
  },
  {
    id: 2,
    name: 'Range Rover',
    description: 'A truck',
    price: 32415.99,
    stock: 150,
  },
]

export const queryMocks: MockRequest[] = [
  // Define mock data for the GraphQL query
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: sample_products,
      },
    },
  },
  {
    request: {
      query: GET_PRODUCTS_COUNT, // Use your actual query
    },
    result: {
      data: {
        products_aggregate: {
          aggregate: {
            count: 2, // Mock the desired count value
          },
        },
      },
    },
  },
]

export const mutationMocks = [
  {
    request: {
      query: INSERT_SINGLE_PRODUCT,
      variables: {
        name: 'Test Product',
        description: 'Test Product description',
        stock: 20,
        price: 30.0,
      },
    },
    result: {
      data: {
        addTodo: {
          id: '3',
          name: 'Test Product',
          description: 'Test Product description',
          stock: 20,
          price: 30.0,
        },
      },
    },
  },
]
