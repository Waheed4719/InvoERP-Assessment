import { useQuery, QueryHookOptions } from '@apollo/client'
import { GET_PRODUCTS } from '../lib/graphql/queries'

const useGetProducts = (options: QueryHookOptions) => {
  const query = useQuery(GET_PRODUCTS, options)
  return query
}

export default useGetProducts
