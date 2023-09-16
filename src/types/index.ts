export type Product = {
  id: number
  name: string
  price: number
  description: string
  stock: number
}

export type ProductForm = Omit<Product, 'id'>
