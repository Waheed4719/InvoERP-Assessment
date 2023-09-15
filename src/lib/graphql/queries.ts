import {gql} from '@apollo/client'

export const getProductsCount = gql`
  query CountQuery {
    products_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const getProductsQuery = gql`
  query getProductsQuery {
    products {
      id
      name
      description
      stock
      price
    }
  }
`;
