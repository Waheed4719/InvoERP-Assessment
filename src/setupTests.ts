/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom'

if (typeof window !== 'undefined') {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      }
    }
}

jest.mock('./hooks/useGetProductsCount', () => ({
  __esModule: true,
  default: () => ({
    data: {
      products_aggregate: {
        aggregate: {
          count: 5,
        },
      },
    },
    refetch: jest.fn(),
  }),
}))

jest.mock('./hooks/useGetProducts', () => ({
  __esModule: true,
  default: () => ({
    data: {
      products: [
        {
          id: 1,
          name: 'Banana',
          description: 'A banana',
          price: 1.99,
          stock: 150,
        },
        {
          id: 2,
          name: 'Apple',
          description: 'An apple',
          price: 1.99,
          stock: 150,
        },
      ],
    },
    refetch: jest.fn(),
  }),
}))

jest.mock('./hooks/useInsertProduct', () => ({
  __esModule: true,
  default: () => ({
    insertProduct: jest.fn(),
  }),
}))
