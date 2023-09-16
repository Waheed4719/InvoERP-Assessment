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
      message.success('Product added successfully')
      return data;
    } catch (error: any) {
      console.log(error, error.toString());
      if(error.toString().includes('Uniqueness violation')){
        message.error('Product already exists')
      }
      else{
        message.error('Something went wrong')
      }
      throw error
    }
  };
  return handleInsertProduct;
};
export default useInsertProduct;
