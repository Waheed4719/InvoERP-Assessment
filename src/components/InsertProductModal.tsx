import { Form, Input, Modal } from 'antd';
import { useState } from 'react';

type FormInputs = {
  name: string;
  description: string;
  stock: number;
  price: number;
};

type Props = {
  open: boolean;
  onOk: (obj: FormInputs) => void;
  onCancel: () => void;
};

const InsertProductModal = ({ open, onOk, onCancel }: Props) => {
  const [formInputs, setFormInputs] = useState<FormInputs>({
    name: '',
    description: '',
    stock: 0,
    price: 0.0,
  });
  const onFormLayoutChange = (changedValues: {
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
      okText="Add Product">
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600, padding: '20px 0px' }}>
        <Form.Item label="Name" name="name">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input placeholder="" />
        </Form.Item>
        <Form.Item label="Stock" name="stock">
          <Input type="number" placeholder="Stock" />
        </Form.Item>
        <Form.Item label="Price ($)" style={{ marginBottom: 0 }} name="price">
          <Input type="number" placeholder="Price" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InsertProductModal;
