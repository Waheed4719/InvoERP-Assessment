import { Form, Input, InputNumber, Modal } from 'antd';
import { useState } from 'react';
import { ProductForm } from '../types';

type Props = {
  open: boolean;
  onOk: (obj: ProductForm) => void;
  onCancel: () => void;
};

const InsertProductModal = ({ open, onOk, onCancel }: Props) => {
  const [formInputs, setFormInputs] = useState<ProductForm>({
    name: '',
    description: '',
    stock: 0,
    price: 0.0,
  });
  const handleFormValuesChange = (changedValues: {
    name: string;
    description: string;
    stock: number;
    price: number;
  }) => {
    setFormInputs({
      ...formInputs,
      ...changedValues,
    });
  };

  const handleFormSubmit = () => {
    onOk({ ...formInputs });
  };

  return (
    <Modal
      title="Add New Product"
      centered
      open={open}
      onOk={handleFormSubmit}
      onCancel={onCancel}
      okText="Add Product"
      data-testid="insert-product-modal" // Add a test ID to the modal itself
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={handleFormValuesChange}
        style={{ maxWidth: 600, padding: '20px 0px' }}>
        <Form.Item label="Name" name="name">
          <Input placeholder="" data-testid="name-input" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="" data-testid="description-input" />
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <InputNumber
            type="number"
            placeholder="Stock"
            data-testid="stock-input"
          />
        </Form.Item>
        <Form.Item label="Price ($)" style={{ marginBottom: 0 }} name="price">
          <InputNumber
            type="number"
            placeholder="Price"
            data-testid="price-input"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InsertProductModal;
