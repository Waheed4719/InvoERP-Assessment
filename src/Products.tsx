import { Button, Typography, Spin, Alert, Tooltip } from 'antd'
import { useState } from 'react'
import ProductsTable from './components/ProductsTable'
import InsertProductModal from './components/InsertProductModal'
import PlusIcon from './components/icons/PlusIcon'
import Container from './components/Container'
import useInsertProduct from './hooks/useInsertProduct'
import useDebounce from './hooks/useDebounce'
import useGetProducts from './hooks/useGetProducts'
import ReloadIcon from './components/icons/ReloadIcon'
import SearchBar from './components/SearchBar'
import { useApolloClient } from '@apollo/client'
import { ProductForm } from './types'

const { Title } = Typography

const Products = () => {
  const client = useApolloClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [pageSize, setPageSize] = useState(5) // Set your desired page size
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('') // Set your desired page size
  const debouncedSearchQuery = useDebounce(searchQuery, 400)
  const {
    data: productsData,
    refetch: refetchProducts,
    loading: isLoadingProducts,
    error: productsError,
  } = useGetProducts({
    variables: {
      limit: pageSize,
      offset: (currentPage - 1) * pageSize,
      searchQuery: debouncedSearchQuery ? `^${debouncedSearchQuery}` : '',
    },
  })
  const handleInsertProduct = useInsertProduct({})
  const products = productsData?.products ?? []
  const productsCount = productsData?.products_aggregate?.aggregate.count ?? 0

  const submitForm = async (values: ProductForm) => {
    try {
      await handleInsertProduct(values)
      setModalOpen(false)
      // Manually invalidate the cache for the products query
      client.cache.evict({
        fieldName: 'products',
        broadcast: false,
      })
      refetchProducts({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        searchQuery: debouncedSearchQuery,
      })
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
    <div
      style={{
        minHeight: '100%',
        height: 'auto',
        backgroundColor: '#fff',
        padding: '20px',
      }}
    >
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
            disabled={isLoadingProducts || Boolean(productsError)}
          >
            Add Product
          </Button>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search from start of product name"
          />
        </div>
        {productsError && (
          <Alert
            message="Error Loading Products"
            type="error"
            showIcon
            action={
              <Tooltip title="Reload Products">
                <Button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: 0,
                  }}
                  onClick={() => refetchProducts()}
                >
                  <ReloadIcon />
                </Button>
              </Tooltip>
            }
          />
        )}
        <ProductsTable
          data={products ?? []}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: productsCount,
          }}
          loading={isLoadingProducts}
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
