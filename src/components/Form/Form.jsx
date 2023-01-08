import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import { SliderPicker } from "react-color";

const ModalForm = ({ open, formTitle, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [color, setColor] = useState();
  const handleColorChange = (e) => {
    console.log(e);
    setColor(e);
  };
  return (
    <Modal
      open={open}
      title={formTitle}
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="color" label="Color">
          <SliderPicker color={color} onChange={handleColorChange} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
