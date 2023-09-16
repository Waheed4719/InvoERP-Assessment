import { useState } from 'react';
import { Button, Typography } from 'antd';
import ProductsTable from './components/ProductsTable';
import useGetProducts from './hooks/useGetProducts';
import useGetProductsCount from './hooks/useGetProductsCount';
import InsertProductModal from './components/InsertProductModal';
import PlusIcon from './components/icons/PlusIcon';
import Container from './components/Container';
import useInsertProduct from './hooks/useInsertProduct';
import { ProductForm } from './types';

const { Title } = Typography;

const Products = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: productsCountData, refetch: refetchProductsCount } =
    useGetProductsCount();
  const { data: productsData, refetch: refetchProducts } = useGetProducts();

  const handleInsertProduct = useInsertProduct();
  const products = productsData?.products ?? [];
  const productsCount =
    productsCountData?.products_aggregate?.aggregate.count ?? 0;

  const submitForm = async (values: ProductForm) => {
    try {
      await handleInsertProduct(values);
      console.log('getting in here');
      setModalOpen(false);
      refetchProducts();
      refetchProductsCount();
    } catch (error) {
      console.log(error);
    }
  };

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
          }}>
          <div>
            <Title level={2} style={{ margin: 0, display: 'flex' }}>
              Products
            </Title>
            <div
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                fontSize: 18,
                color: '#666',
              }}>
              <div>Total Products:</div>
              <span style={{ color: 'darkslategray', fontWeight: 500 }}>
                {productsCount}
              </span>
            </div>
          </div>

          <Button
            icon={<PlusIcon />}
            type="primary"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => setModalOpen(true)}>
            Add Product
          </Button>
        </div>

        <ProductsTable data={products ?? []} />
        {modalOpen && (
          <InsertProductModal
            open={modalOpen}
            onOk={submitForm}
            onCancel={() => setModalOpen(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Products;
