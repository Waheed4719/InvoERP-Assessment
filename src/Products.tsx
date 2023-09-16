import { useState } from 'react'
import { Button, Typography, Spin } from 'antd'
import ProductsTable from './components/ProductsTable'
import InsertProductModal from './components/InsertProductModal'
import PlusIcon from './components/icons/PlusIcon'
import Container from './components/Container'
import useInsertProduct from './hooks/useInsertProduct'
import { ProductForm } from './types'
import useGetProducts from './hooks/useGetProducts'

const { Title } = Typography

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5) // Set your desired page size
  const [currentPage, setCurrentPage] = useState(1)
  const {
    data: productsData,
    refetch: refetchProducts,
    loading: isLoadingProducts,
  } = useGetProducts({
    variables: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
    },
  })

  const handleInsertProduct = useInsertProduct({})
  const products = productsData?.products ?? []
  const productsCount = productsData?.products_aggregate?.aggregate.count ?? 0

  const submitForm = async (values: ProductForm) => {
    try {
      await handleInsertProduct(values)
      setModalOpen(false)
      refetchProducts()
    } catch (error) {
      console.log(error)
    }
  }

  const handleTableChange = (pagination: {
    current: number
    pageSize: number
  }) => {
    if (pageSize != pagination.pageSize) {
      setPageSize(pagination.pageSize)
      setCurrentPage(1)
    } else {
      setCurrentPage(pagination.current)
    }
  }

  return (
    <div style={{ height: '100%', backgroundColor: '#fff', padding: '20px' }}>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          <div>
            <Title
              level={2}
              style={{ margin: 0, display: 'flex', alignItems: 'center' }}
            >
              Products{' '}
              <span style={{ marginLeft: 15 }}>
                {isLoadingProducts && <Spin />}
              </span>
            </Title>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                fontSize: 18,
                color: '#666',
              }}
            >
              <div>Total Products:</div>
              <span
                style={{ color: 'darkslategray', fontWeight: 500 }}
                data-testid="products-count"
              >
                {productsCount}
              </span>
            </div>
          </div>

          <Button
            data-testid="open-add-product-modal-button"
            icon={<PlusIcon />}
            type="primary"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => setModalOpen(true)}
          >
            Add Product
          </Button>
        </div>

        <ProductsTable
          data={products ?? []}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: productsCount,
          }}
          onTableValuesChange={handleTableChange}
        />
        {modalOpen && (
          <InsertProductModal
            open={modalOpen}
            onOk={submitForm}
            onCancel={() => setModalOpen(false)}
          />
        )}
      </Container>
    </div>
  )
}

export default Products
