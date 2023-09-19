import { DocumentNode } from 'graphql'
import { GET_PRODUCTS } from './queries'
import { sample_products } from '../../data/dummy'
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
  delay?: number
}

export const queryMocks: MockRequest[] = [
  {
    request: {
      query: GET_PRODUCTS, // Use your actual query
      variables: {
        limit: 5,
        offset: 0,
        searchQuery: '',
      },
    },
    result: {
      data: {
        products: sample_products.slice(0, 2),
        products_aggregate: {
          aggregate: {
            count: 2, // Mock the desired count value
          },
        },
      },
    },
    delay: 200,
  },
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        limit: 5,
        offset: 0,
        searchQuery: '',
      },
    },
    result: {
      data: {
        products: [
          sample_products.slice(0, 2),
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
            count: 3, // Mock the desired count value
          },
        },
      },
    },
    delay: 200,
  },
  {
    request: {
      query: GET_PRODUCTS, // The refetch query you want to mock
      variables: {
        limit: 5, // Specify the variables if your query requires them
        offset: 0,
        searchQuery: '^Mer',
      },
    },
    result: {
      data: {
        products: [
          // Mocked product data that matches your query
          // You can provide any data that you expect the refetch query to return
          // Ensure that the data structure matches the query schema
          sample_products[0],
          // Add more products as needed
        ],
        products_aggregate: {
          aggregate: {
            count: 1, // Mock the desired count value
          },
        },
      },
    },
    delay: 200,
  },
]

export const mutationMocks: MockRequest[] = [
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

export const queryPaginationMock: MockRequest[] = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        limit: 5,
        offset: 0,
        searchQuery: '',
      },
    },

    result: {
      data: {
        products: sample_products.slice(0, 5),
        products_aggregate: {
          aggregate: {
            count: sample_products.length, // Mock the desired count value
          },
        },
      },
    },
    delay: 200,
  },

  {
    request: {
      query: GET_PRODUCTS,
      variables: {
        limit: 5,
        offset: 5,
        searchQuery: '',
      },
    },

    result: {
      data: {
        products: sample_products.slice(5, 10),
        products_aggregate: {
          aggregate: {
            count: sample_products.length, // Mock the desired count value
          },
        },
      },
    },
    delay: 200,
  },
]
