import React from "react";
import { Modal as ModalAnt, Spin } from "antd";
import Loading from "../Loading";

const Modal = ({
  open,
  formTitle,
  onOk,
  onCancel,
  okText,
  customStyles,
  children,
  form,
  loading,
  ...props
}) => {
  return (
    <ModalAnt
      open={open}
      title={formTitle}
      okText={okText}
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={onCancel}
      maskClosable={false}
      {...props}
    >
      <Spin spinning={loading} indicator={Loading(50)}>
        {children}
      </Spin>
    </ModalAnt>
  );
};

export default Modal;
