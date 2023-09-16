import { Form, Input, InputNumber, Modal, message } from 'antd'
import { useState } from 'react'
import { ProductForm } from '../types'

type Props = {
  open: boolean
  onOk: (obj: ProductForm) => void
  onCancel: () => void
}

const InsertProductModal = ({ open, onOk, onCancel }: Props) => {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)
  const handleFormSubmit = () => {
    setSubmitting(true)
    form
      .validateFields()
      .then((values) => {
        onOk(values) // Call onOk with the validated form values
        form.resetFields() // Reset the form fields after submission
      })
      .catch(() => {
        message.error('Please enter all required fields')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Modal
      title="Add New Product"
      centered
      open={open}
      onOk={handleFormSubmit}
      cancelButtonProps={{ 'data-testid': 'cancel-add-product' }}
      okButtonProps={{ 'data-testid': 'add-product', disabled: submitting }}
      onCancel={onCancel}
      okText="Add Product"
      data-testid="insert-product-modal" // Add a test ID to the modal itself
    >
      <Form
        role="form" // Add a role to the form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600, padding: '20px 0px' }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name' }]} // Added validation rules
        >
          <Input placeholder="" data-testid="name-input" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]} // Added validation rules
        >
          <Input placeholder="" data-testid="description-input" />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: 'Please enter stock quantity' },
            {
              type: 'number',
              min: 1,
              message: 'Stock should be greater than 0',
            },
          ]}
        >
          <InputNumber min={0} placeholder="Stock" data-testid="stock-input" />
        </Form.Item>
        <Form.Item
          label="Price ($)"
          style={{ marginBottom: 0 }}
          name="price"
          rules={[
            { required: true, message: 'Please enter a price' },
            {
              type: 'number',
              min: 0.01,
              message: 'Price must be greater than 0',
            },
          ]}
        >
          <InputNumber min={0.0} placeholder="0.00" data-testid="price-input" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default InsertProductModal
