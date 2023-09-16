import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_COUNT } from "../lib/graphql/queries";

const useGetProductsCount = () => {
  const query = useQuery(GET_PRODUCTS_COUNT);
  return query;
};

export default useGetProductsCount;
