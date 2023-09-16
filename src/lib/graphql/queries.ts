import { gql, DocumentNode } from '@apollo/client'

export const GET_PRODUCTS_COUNT: DocumentNode = gql`
  query CountQuery {
    products_aggregate {
      aggregate {
        count
      }
    }
  }
`

export const GET_PRODUCTS: DocumentNode = gql`
  query getProducts {
    products {
      id
      name
      description
      stock
      price
    }
  }
`
