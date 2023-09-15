import { Modal } from "antd";
import { useState } from "react";

type Props = {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
};

const InsertProductModal = ({open, onOk, onCancel}: Props) => {
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Add Product to inventory</p>
    </Modal>
  );
};

export default InsertProductModal;
