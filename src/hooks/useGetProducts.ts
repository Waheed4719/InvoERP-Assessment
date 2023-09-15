import { useQuery } from "@apollo/client";
import { getProductsQuery } from "../lib/graphql/queries";

const useGetProducts = () => {
  const query = useQuery(getProductsQuery);
  return query;
};

export default useGetProducts;
