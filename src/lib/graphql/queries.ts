import { gql, DocumentNode } from '@apollo/client'

export const GET_PRODUCTS: DocumentNode = gql`
  query getProducts($limit: Int!, $offset: Int!) {
    products(limit: $limit, offset: $offset) {
      id
      name
      description
      stock
      price
    }

    products_aggregate {
      aggregate {
        count
      }
    }
  }
`
