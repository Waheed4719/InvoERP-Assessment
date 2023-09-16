import {gql} from '@apollo/client'

export const INSERT_SINGLE_PRODUCT = gql`
  mutation insertSingleProduct($name: String!, $description: String!, $price: numeric!, $stock: Int!) {
    insert_products_one(object: {name: $name, description: $description, price: $price, stock: $stock}) {
      id
      name
      description
      price
      stock
    }
  }
`;