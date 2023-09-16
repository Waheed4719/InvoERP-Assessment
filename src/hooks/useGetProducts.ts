import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '../lib/graphql/queries'

const useGetProducts = () => {
  const query = useQuery(GET_PRODUCTS)
  return query
}

export default useGetProducts
