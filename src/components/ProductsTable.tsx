import { Table, Typography } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'
import { Product } from '../types'

const { Text } = Typography
const { Cell, Row } = Table.Summary

type TableComponentProps = {
  data: Product[]
  pagination: {
    pageSize: number
    current: number
    total: number
  }
  loading: boolean
  onTableValuesChange: (pagination: {
    current: number
    pageSize: number
  }) => void
}

const columns: ColumnsType<Product> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    onHeaderCell: () => {
      return {
        style: { whiteSpace: 'pre-wrap', minWidth: 150 },
      }
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    onHeaderCell: () => {
      return {
        style: { whiteSpace: 'pre-wrap', minWidth: 300 },
      }
    },
  },
  {
    title: 'Stock',
    dataIndex: 'stock',
    sorter: (a, b) => a.stock - b.stock,
  },
  {
    title: 'Price ($)',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Total Price ($)',
    dataIndex: 'totalPrice',
    render: (_, record) => {
      return <span>{(record.stock * record.price).toFixed(2)}</span>
    },
    sorter: (a, b) => {
      const totalPriceA = a.stock * a.price
      const totalPriceB = b.stock * b.price
      return totalPriceA - totalPriceB
    },
  },
]

const ProductsTable = ({
  data,
  onTableValuesChange,
  pagination,
  loading,
}: TableComponentProps) => {
  const onChange: TableProps<Product>['onChange'] = (pagination) => {
    onTableValuesChange({
      current: pagination.current ?? 1,
      pageSize: pagination.pageSize ?? 10,
    })
  }
  return (
    <Table
      loading={loading}
      bordered
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ['2', '5', '10', '15', '30', '50', '100'],
        ...pagination,
      }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      scroll={{ x: 1000 }}
      rowKey={(record) => record.id}
      summary={(pageData) => {
        let totalPrice = 0

        pageData.forEach(({ stock, price }) => {
          totalPrice += price * stock
        })

        return (
          <Table.Summary fixed>
            <Row className="bg-light-gray">
              <Cell colSpan={5} index={0}>
                <Text strong>Total Value ($)</Text>
              </Cell>
              <Cell index={0}>
                <Text strong>{totalPrice.toFixed(2)}</Text>
              </Cell>
            </Row>
          </Table.Summary>
        )
      }}
    />
  )
}

export default ProductsTable
