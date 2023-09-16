import { message } from 'antd'
import { MutationHookOptions, useMutation } from '@apollo/client'
import { Product } from '../types'
import { INSERT_SINGLE_PRODUCT } from './../lib/graphql/mutations'

const useInsertProduct = (options: MutationHookOptions) => {
  const [insertProduct] = useMutation(INSERT_SINGLE_PRODUCT, options)

  const handleInsertProduct = async (data: Omit<Product, 'id'>) => {
    const { name, description, stock, price } = data
    try {
      const { data } = await insertProduct({
        variables: {
          name,
          description,
          stock,
          price,
        },
      })
      message.success('Product added successfully')
      return data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.toString().includes('Uniqueness violation')) {
        message.error('Product already exists')
      } else {
        message.error('Something went wrong')
      }
      throw error
    }
  }
  return handleInsertProduct
}
export default useInsertProduct
