import { useState } from 'react';
import { Button, Layout, Typography } from 'antd';
import ProductsTable from './components/ProductsTable';
import useGetProducts from './hooks/useGetProducts';
import useGetProductsCount from './hooks/useGetProductsCount';
import InsertProductModal from './components/InsertProductModal';
import PlusIcon from './components/icons/PlusIcon';
import Container from './components/Container';
const { Content } = Layout;
const { Title } = Typography;

export function Products(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: productsCountData } = useGetProductsCount();
  const { data: productsData } = useGetProducts();
  const products = productsData?.products ?? [];

  return (
    <div style={{ height: '100%', backgroundColor: '#fff' }}>
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
                {productsCountData?.products_aggregate?.aggregate.count}
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

        <InsertProductModal
          open={modalOpen}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </Container>
    </div>
  );
}
