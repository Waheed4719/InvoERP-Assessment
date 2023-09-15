import { message } from "antd";
import { useMutation } from "@apollo/client";
import { ProductType } from "../types";
import { insertSingleProduct } from "./../lib/graphql/mutations";

const useInsertProduct = () => {
  const [insertProduct] = useMutation(insertSingleProduct);

  const handleInsertProduct = async (data: Omit<ProductType, "id">) => {
    const { name, description, stock, price } = data;
    try {
      const { data } = await insertProduct({
        variables: {
          name,
          description,
          stock,
          price,
        },
      });
      message.success('Product inserted successfully')
      return data;
    } catch (error) {
      console.log(error);
      message.error('Something went wrong')
    }
  };
  return handleInsertProduct;
};
export default useInsertProduct;
