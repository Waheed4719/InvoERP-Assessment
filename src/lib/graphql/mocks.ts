import { DocumentNode } from 'graphql'
import { GET_PRODUCTS } from './queries'
import { Product } from '../../types'
import { INSERT_SINGLE_PRODUCT } from './mutations'

// Define types for the request and result objects
type MockRequest = {
  request: {
    query: DocumentNode
    variables?: Record<string, unknown>
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
  {
    request: {
      query: GET_PRODUCTS, // Use your actual query
      variables: {
        limit: 5,
        offset: 0,
      },
    },
    result: {
      data: {
        products: sample_products,
        products_aggregate: {
          aggregate: {
            count: sample_products.length, // Mock the desired count value
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
        insert_products_one: {
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

export const refetchQueryMock = [
  {
    request: {
      query: GET_PRODUCTS, // The refetch query you want to mock
      variables: {
        limit: 5, // Specify the variables if your query requires them
        offset: 0,
      },
    },
    result: {
      data: {
        products: [
          // Mocked product data that matches your query
          // You can provide any data that you expect the refetch query to return
          // Ensure that the data structure matches the query schema
          ...sample_products,
          {
            id: '3',
            name: 'Test Product',
            description: 'Test Product description',
            stock: 20,
            price: 30.0,
          },
          // Add more products as needed
        ],
        products_aggregate: {
          aggregate: {
            count: sample_products.length + 1, // Mock the desired count value
          },
        },
      },
    },
  },
]
