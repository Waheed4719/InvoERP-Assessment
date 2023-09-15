import { useQuery } from "@apollo/client";
import { getProductsCount } from "../lib/graphql/queries";

const useGetProductsCount = () => {
  const { data, loading, error } = useQuery(getProductsCount);
  return { data, loading, error };
};

export default useGetProductsCount;
