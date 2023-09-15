import { useState } from "react";
import Statistic from "antd/es/statistic/Statistic";
import { Modal, Button } from "antd";
import ProductsTable from "./components/ProductsTable";
import useGetProducts from "./hooks/useGetProducts";
import useGetProductsCount from "./hooks/useGetProductsCount";
import InsertProductModal from "./components/InsertProductModal";

export function Products(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: productsCountData } = useGetProductsCount();
  const { data: productsData } = useGetProducts();
  const products = productsData?.products ?? [];

  return (
    <div>
      <Statistic
        title="Total products"
        value={productsCountData?.products_aggregate?.aggregate.count}
      />
      <div style={{ maxWidth: 1200, width: "100%", margin: "40px auto" }}>
        <ProductsTable data={products ?? []} />
      </div>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Add Product
      </Button>
      <InsertProductModal
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
