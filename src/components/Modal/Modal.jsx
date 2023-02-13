import React from "react";
import { Modal as ModalAnt } from "antd";
import Loading from "../Loading";
import { LOADER_SIZE } from "../../constants/app.constants";
import Spinner from "../Spinner";

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
  disableOk,
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
      okButtonProps={{
        disabled: disableOk,
      }}
      onCancel={onCancel}
      maskClosable={false}
      keyboard={false}
      closable={false}
      destroyOnClose={true}
      {...props}
    >
      <Spinner spinning={loading} indicator={Loading(LOADER_SIZE)}>
        {children}
      </Spinner>
    </ModalAnt>
  );
};

export default Modal;
