import { Form, Input, ColorPicker } from "antd";
import { useEffect } from "react";

const ListDialogForm = ({ form, handleColorChange, layout, initialValues }) => {
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "List name is required",
          },
        ]}
      >
        <Input autoComplete="off" maxLength={20} showCount />
      </Form.Item>
      <Form.Item name="color" label="Color">
        <ColorPicker onChangeComplete={handleColorChange} showText />
      </Form.Item>
    </Form>
  );
};

export default ListDialogForm;
