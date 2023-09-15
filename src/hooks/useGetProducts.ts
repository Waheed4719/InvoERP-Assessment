import { useQuery } from "@apollo/client";
import { getProductsQuery } from "../lib/graphql/queries";

const useGetProducts = () => {
  const { data, loading, error } = useQuery(getProductsQuery);
  return { data, loading, error };
};

export default useGetProducts;
