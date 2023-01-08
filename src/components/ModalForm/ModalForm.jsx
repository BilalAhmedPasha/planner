import React from "react";
import { Form, Modal } from "antd";

const ModalForm = ({
  open,
  formTitle,
  onOk,
  onCancel,
  okText,
  children,
  ...props
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      title={formTitle}
      okText={okText}
      cancelText="Cancel"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onOk(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        {children}
      </Form>
    </Modal>
  );
};

export default ModalForm;
