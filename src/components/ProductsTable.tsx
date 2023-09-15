import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ProductType } from "../types";

type TableComponentProps = {
  data: ProductType[];
}

const columns: ColumnsType<ProductType> = [
  {
    title: "Name",
    dataIndex: "name",
    width: "20%",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sorter: (a, b) => a.stock - b.stock,
  },
];

const onChange: TableProps<ProductType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};
 
const ProductsTable = ({ data }: TableComponentProps) => {
  return <Table columns={columns} dataSource={data} onChange={onChange} rowKey={record=>record.id} />;
};

export default ProductsTable;
