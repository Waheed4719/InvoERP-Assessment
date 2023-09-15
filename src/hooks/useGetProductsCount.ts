import { useQuery } from "@apollo/client";
import { getProductsCount } from "../lib/graphql/queries";

const useGetProductsCount = () => {
  const query = useQuery(getProductsCount);
  return query;
};

export default useGetProductsCount;
