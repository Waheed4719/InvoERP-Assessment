import { gql, DocumentNode } from '@apollo/client'

export const GET_PRODUCTS: DocumentNode = gql`
  query getProducts($limit: Int, $offset: Int, $searchQuery: String = "") {
    products(
      limit: $limit
      offset: $offset
      where: { name: { _iregex: $searchQuery } }
    ) {
      id
      name
      description
      stock
      price
    }

    products_aggregate(where: { name: { _iregex: $searchQuery } }) {
      aggregate {
        count
      }
    }
  }
`
